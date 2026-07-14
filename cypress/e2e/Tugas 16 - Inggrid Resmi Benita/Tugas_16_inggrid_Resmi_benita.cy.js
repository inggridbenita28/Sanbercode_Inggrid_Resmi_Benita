describe('Login OrangeHRM', () => {
  it('TC-LOGIN-001 - Login dengan menggunakan username dan passoword yang sudah terdaftar', () => {
    // Menangkap request login yang dikirim ke server
    // untuk memastikan proses autentikasi berjalan
    cy.intercept('POST', '**/auth/validate').as('LoginUsername&PasswordValid');
    
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible').type('Admin');
    cy.get('input[name="password"]', { timeout: 10000 }).should('be.visible').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.wait('@LoginUsername&PasswordValid').its('response.statusCode').should('be.oneOf', [200, 302]);
    cy.url().should('include', '/dashboard/index');
    cy.contains('Dashboard').should('be.visible');
  });

  it('TC-LOGIN-002 - Login menggunakan username huruf kecil semua untuk akun yang terdaftar dengan huruf kapital', () => {
    // Menangkap request login menggunakan username huruf kecil
    // untuk memastikan proses login tetap berjalan
    cy.intercept('POST', '**/auth/validate').as('LoginUsernameLowercase');

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.wait('@LoginUsernameLowercase').its('request.method').should('eq', 'POST');
    cy.url().should('include', '/dashboard/index');
    cy.contains('Dashboard').should('be.visible');
  });

  it('TC-LOGIN-003 - Login dengan mengosongkan kolom input username dan password', () => {
    // Menangkap request halaman login
    // untuk memastikan halaman berhasil dimuat Sebelum pengujian login dengan input kosong
    cy.intercept('GET', '**/auth/login').as('LoginPageTC003');

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.wait('@LoginPageTC003').its('response.statusCode').should('eq', 200);
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-field-error-message').should('have.length', 2).and('contain', 'Required');
  });

  it('TC-LOGIN-004 - Login dengan mengisi password yang sudah terdaftar dan mengosongkan kolom input username', () => {
    // Menangkap request halaman login
    // untuk memastikan halaman berhasil dimuat sebelum pengujian username kosong
    cy.intercept('GET', '**/auth/login').as('loginPageTC004');

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.wait('@loginPageTC004').its('response.statusCode').should('eq', 200);
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-field-error-message').should('contain', 'Required');
  });

  it('TC-LOGIN-005 - Login dengan mengisi username yang sudah terdaftar dan mengosongkan kolom input password', () => {
    // Menangkap request halaman login
    // sebelum pengujian password kosong
    cy.intercept('GET', '**/auth/login').as('loginPageTC005');

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.wait('@loginPageTC005').its('response.statusCode').should('eq', 200);
    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-field-error-message').should('contain', 'Required');
  });

  it('TC-LOGIN-006 - Login dengan menggunakan username dan password yang belum terdaftar', () => {
    // Menangkap request login gagal
    // untuk memastikan validasi kredensial berjalan
    cy.intercept('POST', '**/auth/validate').as('LoginUsernamePasswordInvalid');

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('usernamesalah');
    cy.get('input[name="password"]').type('passwordsalah');
    cy.get('button[type="submit"]').click();
    cy.wait('@LoginUsernamePasswordInvalid').its('request.method').should('eq', 'POST');
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC-LOGIN-007 - Login dengan menggunakan username yang terdaftar dan password salah', () => {
     // Menangkap request login dengan password salah
    cy.intercept('POST', '**/auth/validate').as('wrongPassword');

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('passwordsalah');
    cy.get('button[type="submit"]').click();
    cy.wait('@wrongPassword').its('request.method').should('eq', 'POST');
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC-LOGIN-008 - Login dengan password terdaftar dan username salah', () => {
    // Menangkap request login dengan username salah
    cy.intercept('POST', '**/auth/validate').as('wrongUsername');
    
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible').type('usernamesalah');
    cy.get('input[name="password"]', { timeout: 10000 }).should('be.visible').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.wait('@wrongUsername').its('request.method').should('eq', 'POST');
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC-LOGIN-009 - Login dengan meggunakan password yang diinput huruf kapital semua untuk akun yang terdaftar', () => {
    // Menangkap request login dengan password kapital
    cy.intercept('POST', '**/auth/validate').as('PasswordKapital');

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('ADMIN123');
    cy.get('button[type="submit"]').click();
    cy.wait('@PasswordKapital').its('request.method').should('eq', 'POST');
    cy.get('.oxd-alert-content-text').should('contain.text', 'Invalid credentials');
  });

  it('TC-LOGIN-010 - Fitur hide password saat mengetik pada kolom password', () => {
    // Menangkap request halaman login
    // sebelum pengujian hide password
    cy.intercept('GET', '**/auth/login').as('loginPageTC010');

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.wait('@loginPageTC010').its('response.statusCode').should('eq', 200);
    cy.get('input[name="password"]').type('admin123');
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });

  it('TC-LOGIN-011 - Klik Text link Forgot your password', () => {
  // Menangkap request halaman login
  // untuk memastikan halaman berhasil dimuat
  cy.intercept('GET', '**/auth/login').as('loginPageTC011');

  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  cy.wait('@loginPageTC011').its('response.statusCode').should('eq', 200);
  cy.contains('Forgot your password?', { timeout: 10000 }).should('be.visible').click();
  cy.url().should('include', 'requestPasswordResetCode');
  });

  it('TC-LOGIN-012 - Verifikasi tombol Login tampil', () => {
    // Menangkap request halaman login
    // sebelum verifikasi tombol Login
    cy.intercept('GET', '**/auth/login').as('loginPageTC012');

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.wait('@loginPageTC012').its('response.statusCode').should('eq', 200);
    cy.get('button[type="submit"]').should('be.visible').and('contain.text', 'Login').and('not.be.disabled');
  });

  it('TC-LOGIN-013 - Klik Text link OrangeHRM, Inc.', () => {
    // Menangkap request halaman login
    // sebelum verifikasi teks OrangeHRM
    cy.intercept('GET', '**/auth/login').as('loginPageTC013');
    
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.wait('@loginPageTC013').its('response.statusCode').should('eq', 200);
    cy.contains('OrangeHRM, Inc.').should('be.visible');
  });
});