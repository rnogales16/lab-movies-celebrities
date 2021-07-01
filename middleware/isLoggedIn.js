function isLoggedIn(req, res, next) {
	
  console.log(req.session.currentUser);

	if (req.session.currentUser) {//the session comes from app.js and we can call it
    next();//this gives acces to the user to the next route... if there is an user logged in you can proceed
	
  } else {//else go back to log in page
	
    res.redirect('/auth/login');
	}
}

module.exports = isLoggedIn;