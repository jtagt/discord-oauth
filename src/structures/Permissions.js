import { permissions, implicit } from '../static/permissions.js';
import { resolvePermission } from '../resolvers/permission.js';

export class Permissions {
    constructor(permissions = 0, implicit = false, resolve = true) {
        this.bitfield = resolve ? resolvePermission(permissions) : permissions;
        this.useImplicit = implicit;
    }

    get implicit() {
        let bitfield = this.bitfield;
        let oldBitfield = null;

        while (oldBitfield !== bitfield) {
            oldBitfield = bitfield;

            Object.keys(implicit).forEach(p => {
                const permission = permissions[p];
                const has = (bitfield & permission) === permission;

                if (has && implicit[p].allow) {
                    bitfield |= resolvePermission(implicit[p].allow);
                }
                else if (!has && implicit[p].deny) {
                    bitfield &= ~resolvePermission(implicit[p].deny);
                }
            });
        }

        return bitfield;
    }

    object(useImplicit = this.useImplicit) {
        const bitfield = useImplicit ? this.implicit : this.bitfield;
        const permissionsObject = {};

        Object.keys(permissions).forEach(p => {
            const permission = permissions[p];
            permissionsObject[p] = (bitfield & permission) === permission;
        });

        return permissionsObject;
    }

    add(permissions) {
        this.bitfield |= resolvePermission(permissions);
    }

    has(permissions, useImplicit = this.useImplicit) {
        const bitfield = useImplicit ? this.implicit : this.bitfield;
        const resolved = resolvePermission(permissions);

        return (bitfield & resolved) === resolved;
    }

    remove(permissions) {
        this.bitfield &= ~resolvePermission(permissions);
    }
}
