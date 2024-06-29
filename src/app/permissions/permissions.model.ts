export type PermissionNode = {
  name: string;
  children: PermissionNode[];
  checked: boolean;
  parent?: PermissionNode;
};
