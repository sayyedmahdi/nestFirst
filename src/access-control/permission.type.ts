import AdminPermission from "./adminPermissions";
import UserPermission from "./userPermissions";
 
const Permission = {
  ...AdminPermission,
  ...UserPermission
}
 
type Permission = AdminPermission | UserPermission;
 
export default Permission;