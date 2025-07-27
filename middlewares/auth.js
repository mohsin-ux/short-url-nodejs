import { getUser } from '../service/auth.js';

function restrictToLoggedinUserOnly(req, res, next) {
  const userId = req.cookies.userId;
  if (!userId)
    return res.redirect('/login', {
      error: 'user id is not available',
    });
  const user = getUser(userId);
  if (!user)
    return res.redirect('/login', {
      error: 'user is invalid',
    });
  req.user = user;
  next();
}

export { restrictToLoggedinUserOnly };
