import { PermissionsService } from './permissions.service';
import { PermissionNode } from '../permissions.model';

describe('PermissionsService', () => {
  let service: PermissionsService;

  beforeEach(() => {
    service = new PermissionsService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('checkChildren method should work', () => {
    const mockNode = {"name":"user-management","children":[{"name":"create","children":[],"checked":true},{"name":"edit","children":[],"checked":true}],"checked":true}
    service.checkChildren(mockNode, false);
    mockNode.children.forEach((child) => {
      expect(child.checked).toBe(false);
    })
  });

  it('checkParent method should work', () => {
    const nodes = [{"name":"admin","children":[{"name":"user-management","children":[{"name":"create","children":[],"checked":false},{"name":"edit","children":[],"checked":true}],"checked":true},{"name":"roles","children":[{"name":"create","children":[],"checked":true}],"checked":true}],"checked":true}]
    service.checkParent(nodes);
    expect(nodes[0].checked).toBe(false);
    expect(nodes[0].children[0].checked).toBe(false);
  });

  describe('buildTree', () => {
    it('should build a permission tree from permissions array', () => {
      const permissions: string[] = [
        'admin.user-management.create',
        'admin.user-management.edit',
        'admin.user-management.delete',
        'admin.roles.create',
        'admin.roles.edit',
        'admin.messages.read',
        'ai-service.translation.read',
        'ai-service.agents.read',
      ];

      const result: PermissionNode[] = service.buildTree(permissions);

      expect(result.length).toBe(2);
      expect(result[0].name).toBe('admin');
      expect(result[0].children.length).toBe(3);
      expect(result[0].children[0].name).toBe('user-management');
      expect(result[1].name).toBe('ai-service');
      expect(result[1].children.length).toBe(2);
    });

    it('should handle duplicate permissions gracefully', () => {
      const permissions: string[] = [
        'admin.user-management.create',
        'admin.user-management.create',
        'admin.roles.create',
      ];

      const result: PermissionNode[] = service.buildTree(permissions);

      expect(result.length).toBe(1);
      expect(result[0].name).toBe('admin');
      expect(result[0].children.length).toBe(2);
      expect(result[0].children[0].name).toBe('user-management');
      expect(result[0].children[0].children.length).toBe(1);
    });

    it('should handle empty permissions array', () => {
      const permissions: string[] = [];

      const result: PermissionNode[] = service.buildTree(permissions);

      expect(result.length).toBe(0);
    });
  });
});
