const homeGet = (req, res) => {
  res.render('home', {
    title: 'Home',
  });
};

const registerGet = (req, res) => {
  res.render('register'),
    {
      title: 'Register',
    };
};

const loginGet = (req, res) => {
  res.render('login'),
    {
      title: 'Login',
    };
};

export default { homeGet, registerGet, loginGet };
