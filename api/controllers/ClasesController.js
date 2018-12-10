const localStorage = require('localStorage');
module.exports = {
	lista:function(req, res){
        Clases.find({}).exec(function(err, clases){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
						var aux = req.signedCookies.authorization;
						if (aux===undefined){
							res.view('login');
						}else{
							res.view('lista_clases', {clases:clases});
						}

        });
    },
    create:function(req, res){
				var id_cla = req.body.id_cla;
				var id_lec = req.body.id_lec;
				var fecha = req.body.fecha;
				var runAcademico = req.body.runAcademico;
				var horaInicio = req.body.horaInicio;
        var horaTermino = req.body.horaTermino;

    		Clases.create({id_cla:id_cla, id_lec:id_lec, fecha:fecha, runAcademico:runAcademico, horaInicio:horaInicio, horaTermino:horaTermino}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Errorrrr'});
            }
            res.redirect('/clases/lista');
        });
    },
    delete: function(req, res){
        Clases.destroy({id_cla:req.params.id_cla}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }

            res.redirect('/clases/lista');
        });

        return false;
    },
    update: function(req, res){
        //var title = req.body.title;
        //var body = req.body.body;

        var id_cla = req.body.id_cla;
				var fecha = req.body.fecha;
				var horaInicio = req.body.horaInicio;
        var horaTermino = req.body.horaTermino;

        Clases.update({id_cla: req.params.id},{fecha:fecha, horaInicio:horaInicio, horaTermino:horaTermino}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }

            res.redirect('/clases/lista');
        });

        return false;
    }
};
