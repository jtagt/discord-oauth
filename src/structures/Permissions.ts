import { permissions, implicit, permissionsKey, PermissionResolveable } from '../static/permissions.js';
import { resolvePermission } from '../resolvers/permission.js';

type NonNullableObj<T> = T extends Object ? {[Key in keyof T]-?: NonNullable<T[Key]>} : T;

export class Permissions {
    bitfield: number;
    useImplicit: boolean;

    constructor(permissions: PermissionResolveable, implict: boolean, resolve: true)
    constructor(permissions: number, implict: boolean, resolve: false)
    constructor(permissions: PermissionResolveable = 0, implicit = false, resolve = true) {
        this.bitfield = resolve ? resolvePermission(permissions) : permissions;
        this.useImplicit = implicit;
    }

    get implicit() {
        let bitfield = this.bitfield;
        let oldBitfield = null;

        while (oldBitfield !== bitfield) {
            oldBitfield = bitfield;

            (Object.keys(implicit) as (keyof typeof implicit)[]).forEach(p => {
                const permission = permissions[p];
                const has = (bitfield & permission) === permission;

                if (has && 'allow' in implicit[p]) {
                    bitfield |= resolvePermission((implicit[p] as {allow:permissionsKey[]}).allow);
                }
                else if (!has && 'deny' in implicit[p]) {
                    bitfield &= ~resolvePermission((implicit[p] as {deny:permissionsKey[]}).deny);
                }
            });
        }

        return bitfield;
    }

    object(useImplicit = this.useImplicit) {
        const bitfield = useImplicit ? this.implicit : this.bitfield;
        const permissionsObject: {[key in permissionsKey]?: boolean} = {};

        (Object.keys(permissions) as permissionsKey[]).forEach(p => {
            const permission = permissions[p];
            permissionsObject[p] = (bitfield & permission) === permission;
        });

        return permissionsObject as NonNullableObj<typeof permissionsObject>;
    }

    add(permissions: PermissionResolveable) {
        this.bitfield |= resolvePermission(permissions);
    }

    has(permissions: PermissionResolveable, useImplicit = this.useImplicit) {
        const bitfield = useImplicit ? this.implicit : this.bitfield;
        const resolved = resolvePermission(permissions);

        return (bitfield & resolved) === resolved;
    }

    remove(permissions: PermissionResolveable) {
        this.bitfield &= ~resolvePermission(permissions);
    }
}
