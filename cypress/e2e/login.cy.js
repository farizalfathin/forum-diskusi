describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
    cy.viewport('macbook-15')
  });

  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="Email Address"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when username is empty', () => {

    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"id" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {

    cy.get('input[placeholder="Email Address"]').type('example@gmail.com');

    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"id" is not allowed to be empty');
    });
  });

  it('should display alert when username and password are wrong', () => {
    // mengisi username
    cy.get('input[placeholder="Email Address"]').type('testuser@gmail.com');
 
    // mengisi password yang salah
    cy.get('input[placeholder="Password"]').type('wrong_password');
 
    // menekan tombol Login
    cy.get('button').contains(/^Login$/).click();
 
    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('User ID or password is wrong');
    });
  });

  it('should display homepage when username and password are correct', () => {
    // mengisi username
    cy.get('input[placeholder="Email Address"]').type('example@gmail.com');
 
    // mengisi password
    cy.get('input[placeholder="Password"]').type('example');
 
    // menekan tombol Login
    cy.get('button').contains(/^Login$/).click();
  });
});