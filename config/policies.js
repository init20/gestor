/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

   '*': true,


  UserController:{
    '*': true
  },
  LectoresController:{
    lista: true,
  },
  ClasesController:{
    lista: true,
    create: 'isLoggedIn',
    agregar:true,
    delete: true,
    edit: true,
    actualizar:true,
  },
  AsistenciasController:{
    list:true,
    create:'isLoggedIn',
  }
 //funcionarios red academicos


};
