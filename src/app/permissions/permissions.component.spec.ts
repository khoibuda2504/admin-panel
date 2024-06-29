import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermissionsComponent } from './permissions.component';
import { PermissionsService } from './services/permissions.service';
import { PermissionStore } from './store/permissions.store';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './components/tree/tree.component';

describe('PermissionsComponent', () => {
  let component: PermissionsComponent;
  let fixture: ComponentFixture<PermissionsComponent>;
  let permissionsServiceSpy: jasmine.SpyObj<PermissionsService>;
  let permissionStoreSpy: jasmine.SpyObj<PermissionStore>;

  beforeEach(() => {
    const permissionsServiceSpyObj = jasmine.createSpyObj(
      'PermissionsService',
      ['checkParent', 'checkChildren']
    );
    const permissionStoreSpyObj = jasmine.createSpyObj('PermissionStore', [
      'selectedPermissions$',
    ]);

    TestBed.configureTestingModule({
      imports: [CommonModule, PermissionsComponent, TreeComponent],
      providers: [
        { provide: PermissionsService, useValue: permissionsServiceSpyObj },
        { provide: PermissionStore, useValue: permissionStoreSpyObj },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionsComponent);
    component = fixture.componentInstance;
    permissionsServiceSpy = TestBed.inject(
      PermissionsService
    ) as jasmine.SpyObj<PermissionsService>;
    permissionStoreSpy = TestBed.inject(
      PermissionStore
    ) as jasmine.SpyObj<PermissionStore>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to the bottom in ngAfterViewChecked', () => {
    const mockConsoleElement = jasmine.createSpyObj('ElementRef', [
      'nativeElement',
    ]);
    mockConsoleElement.nativeElement = jasmine.createSpyObj('HTMLDivElement', [
      'scrollHeight',
      'scrollTop',
    ]);
    mockConsoleElement.nativeElement.scrollHeight = 100;
    mockConsoleElement.nativeElement.scrollTop = 0;

    component.console = mockConsoleElement;

    component.ngAfterViewChecked();

    expect(mockConsoleElement.nativeElement.scrollTop).toBe(100);
  });
});
