const localStorage = require('localStorage');
module.exports = {
	lista:function(req, res){
        Lectores.find({}).exec(function(err, lectores){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
						var aux = req.signedCookies.authorization;
						if (aux===undefined){
							res.view('login');
						}else{
							res.view('lista_lectores', {lectores:lectores});
						}
        });
    },
    agregar: function(req, res){
			var aux = req.signedCookies.authorization;
			if (aux===undefined){
				res.view('login');
			}else{
				res.view('agregar');
			}
			

    },
    create:function(req, res){


				var id_lec = req.body.id_lec;
				var facultad = req.body.facultad;
				var sala = req.body.sala;

        Lectores.create({id_lec:id_lec, facultad:facultad, sala:sala}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }

            res.redirect('/lectores/lista');
        });
    },
    delete: function(req, res){
        Lectores.destroy({id:req.params.id}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }

            res.redirect('/lectores/lista');
        });

        return false;
    },
    editar: function(req, res){
        Lectores.findOne({id:req.params.id}).exec(function(err, lector){
            if(err){
                res.send(500, {error: 'Database Error'});
            }

            res.view('editar', {lector:lector});
        });
    },
    actualizar: function(req, res){
        //var title = req.body.title;
        //var body = req.body.body;

				var id_lec = req.body.id_lec;
				var facultad = req.body.facultad;
				var sala = req.body.sala;
				var estado = req.body.estado;
        Lectores.update({id: req.params.id},{id_lec:id_lec, facultad:facultad, sala:sala, estado:estado}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }

            res.redirect('/lectores/lista');
        });
				res.redirect('/lectores/lista');
        return false;
    },

};
