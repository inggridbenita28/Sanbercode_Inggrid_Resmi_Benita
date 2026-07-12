describe('Login OrangeHRM', () => {
  it('TC-LOGIN-001 - Login dengan menggunakan username dan passoword yang sudah terdaftar', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard/index');
    cy.contains('Dashboard').should('be.visible');
  });

  it('TC-LOGIN-002 - Login menggunakan username huruf kecil semua untuk akun yang terdaftar dengan huruf kapital', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard/index');
    cy.contains('Dashboard').should('be.visible');
  });

  it('TC-LOGIN-003 - Login dengan mengosongkan kolom input username dan password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-field-error-message').should('have.length', 2).and('contain', 'Required');
  });

  it('TC-LOGIN-004 - Login dengan mengisi password yang sudah terdaftar dan mengosongkan kolom input username', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-field-error-message').should('contain', 'Required');
  });

  it('TC-LOGIN-005 - Login dengan mengisi username yang sudah terdaftar dan mengosongkan kolom input password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-field-error-message').should('contain', 'Required');
  });

  it('TC-LOGIN-006 - Login dengan menggunakan username dan password yang belum terdaftar', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('usernamesalah');
    cy.get('input[name="password"]').type('passwordsalah');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC-LOGIN-007 - Login dengan menggunakan username yang terdaftar dan password salah', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('passwordsalah');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC-LOGIN-008 - Login dengan password terdaftar dan username salah', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('usernamesalah');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC-LOGIN-009 - Login dengan meggunakan password yang diinput huruf kapital semua untuk akun yang terdaftar', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('ADMIN123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content-text').should('contain.text', 'Invalid credentials');
  });

  it('TC-LOGIN-010 - Fitur hide password saat mengetik pada kolom password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="password"]').type('admin123');
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });

  it('TC-LOGIN-011 - Klik link Forgot your password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.contains('Forgot your password?').click();
    cy.url().should('eq','https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode');
  });

  it('TC-LOGIN-012 - Verifikasi tombol Login tampil', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('button[type="submit"]').should('be.visible').and('contain.text', 'Login').and('not.be.disabled');
  });

  it('TC-LOGIN-013 - Klik link OrangeHRM, Inc.', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.contains('OrangeHRM, Inc.').invoke('removeAttr', 'target').click();
    cy.url().should('include', 'orangehrm.com');
  });
});