export const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/nosignin');
  };
  
  export const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/passprofile');
  };

// module.exports={
//     isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     return res.redirect('/nosignin');
//     },
//     isNotLoggedIn(req,res,next){
//         if(!req.isAuthenticated()){
//             return next();
//         }
//     return res.redirect('/passprofile')
//     }
// };