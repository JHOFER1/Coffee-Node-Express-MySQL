import bcrypt from 'bcryptjs';
export const encryptPassword=async(password)=>{
  const salt= await bcrypt.genSalt(10);// ejecutar para crear una hash
  const hash= await bcrypt.hash(password, salt);
  return hash; 
};
export const matchPassword= async (password, savedPasword)=>{

    try{
       return  await bcrypt.compare(password, savedPasword);
    } catch(e)
{
    console.log(e);
}};

// export default helpers;
// module.exports= helpers;

// import bcrypt from 'bcryptjs';
// const helpers={};
// helpers.encryptPassword=async(password)=>{
//   const salt= await bcrypt.genSalt(10);// ejecutar para crear una hash
//   const hash= await bcrypt.hash(password, salt);
//   return hash; 
// };
// helpers.matchPassword= async (password, savedPasword)=>{

//     try{
//        return  await bcrypt.compare(password, savedPasword);
//     } catch(e)
// {
//     console.log(e);
// }};

// export default helpers;