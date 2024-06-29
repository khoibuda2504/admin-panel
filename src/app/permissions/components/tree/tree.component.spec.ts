import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree.component';
import { PermissionsService } from 'app/permissions/services/permissions.service';
import { PermissionStore } from 'app/permissions/store/permissions.store';

describe('TreeComponent', () => {
  let component: TreeComponent;
  let fixture: ComponentFixture<TreeComponent>;
  let permissionsServiceSpy: jasmine.SpyObj<PermissionsService>;
  let permissionStoreSpy: jasmine.SpyObj<PermissionStore>;

  beforeEach(() => {
    const permissionsServiceSpyObj = jasmine.createSpyObj(
      'PermissionsService',
      ['checkChildren', 'checkParent']
    );
    const permissionStoreSpyObj = jasmine.createSpyObj('PermissionStore', [
      'addPermission',
    ]);

    TestBed.configureTestingModule({
      imports: [CommonModule, TreeComponent],
      providers: [
        { provide: PermissionsService, useValue: permissionsServiceSpyObj },
        { provide: PermissionStore, useValue: permissionStoreSpyObj },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TreeComponent);
    component = fixture.componentInstance;
    permissionsServiceSpy = TestBed.inject(
      PermissionsService
    ) as jasmine.SpyObj<PermissionsService>;
    permissionStoreSpy = TestBed.inject(
      PermissionStore
    ) as jasmine.SpyObj<PermissionStore>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('update checkbox true and call services correctly on checkbox change', () => {
    const mockNode = {
      id: 'test-permission',
      name: 'Test Permission',
      checked: false,
      children: [],
    };
    const mockEvent = {
      target: { checked: true, id: 'test-permission' },
    } as unknown as Event;

    component.onCheckboxChange(mockNode, mockEvent);

    expect(mockNode.checked).toBe(true);
    expect(permissionStoreSpy.addPermission).toHaveBeenCalledWith(
      'You have selected test-permission permission'
    );
    expect(permissionsServiceSpy.checkChildren).toHaveBeenCalledWith(
      mockNode,
      true
    );
    expect(permissionsServiceSpy.checkParent).toHaveBeenCalled();
  });

  it('update checkbox false', () => {
    const mockNode = {
      id: 'test-permission',
      name: 'Test Permission',
      checked: true,
      children: [],
    };
    const mockEvent = {
      target: { checked: false, id: 'test-permission' },
    } as unknown as Event;

    component.onCheckboxChange(mockNode, mockEvent);

    expect(mockNode.checked).toBe(false);
  });

  it('should return concatenated parentName in getter', () => {
    const testName = 'test';
    component.parentName = testName;
    expect(component.parentName).toBe(testName + '.');
  });
});
