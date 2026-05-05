exports.isLoggedIn = (req, res) => {
  if (req.session.currentUser) {
    req.session.flash = {
      type: 'info',
      intro: 'error!',
      message: 'you are already logged in',
    };
    res.redirect(303, '/');
    return true;
  }
  return false;
}

exports.ForceLoggedInUser = (req, res) => {
  if (req.session.currentUser) {
    return false;
  }
  req.session.flash = {
    type: 'info',
    intro: 'error!',
    message: 'you must be logged in to do this',
  };
  res.redirect(302, '/');
  return true;
}