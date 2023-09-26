const { query } = require("express");
const tour = require("../modelo/tourModel");
const ApiFeatures = require("../features/API_features.JS");
const catchAsyncErro = require("../features/AppErrosAsync")

exports.checkBody = (req, res, next) => {
  if (req.body.name && req.body.price)
    return res.status(401).json({
      status: "Fail",
      message: "Faltam o nome do produto e o preço",
    });
  next();
};



// Para obter os 5 melhores tours
// O uso de midleware
exports.get_5_best_tours = (req, res, next) => {
  req.query.sort = "-price, ratingAverage";
  req.query.limit = 5;

  next();
};

// Para obter os mais baratos

exports.get_5_cheap_tours = (req, res, next) => {
  req.query.sort = "price";
  req.query.limit = 5;
  next();
};




exports.getAllTours = catchAsyncErro( async (req, res,next) =>{
  
    const filter = new ApiFeatures(tour.find(), req.query)
      .filter()
      .sorting()
      .fields()
      .pagination();

    const Tours = await filter.query;

    // Mandado a resposta
    res.status(200).json({
      status: "Sucesso",
      numerosDeTours: Tours.length,
      dados: {
        Tours,
      },
    }) 
})





exports.CriarTour =  catchAsyncErro (async(req, res,next)=> {
  
    // Esta função do moongose cria um novo tour consoante aos dados que sao submetidos no body
    const newTour = await tour.create(req.body);

    console.log(req.body);

    res.status(201).json({
      status: "Success",
      message: "Novo Tour criando",
      data: Date.now(),
      dados: newTour,
    });
 
});

exports.getOneTour = catchAsyncErro (async(req, res,next) => {
 
    // Esta função do moongose  faz uma pequisa na base de dados consoante ao id  que é passado no paramento da url
    const OneTour = await tour.findById(req.params.id);

    res.status(200).json({
      status: "Success",
      data: {
        OneTour,
      },
    });
  
});

exports.atualizarTour = catchAsyncErro ( async(req, res,next) => {

  //  função moongose atualiza os dados consoante ao id que é passado no paramento da URI
    const updatedTour =await tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(201).json({
      status: "Success",
      message: "Dados Atualizados",
      data: {
        updatedTour,
      },
    });
  
});

exports.deleteTour = catchAsyncErro( async (req, res,next)=> {
 
    const deletedTour = await tour.findByIdAndDelete(req.params.id);
    
    res.status(204).json({
      status: "Success",
      message: "Ficheiro Apagado com sucesso",
      data: null,
    });
  
   
});

exports.getMonthlyPlan = catchAsyncErro(async(req, res,next) => {
   
  
  const year = req.params.year * 1;

    // Este metodo deve agregar o array para apenas um elemento (funciona so que falta a datas)
    const plan = await tour.aggregate([
      { $unwind: "$images" },

      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },

        $group: {
          _id: { $month: "$startDates" },
          numTours: { $sum: 1 },
          Tours: {
            $push: "$name",
          },
        },

        $addFields: {
          month: "$_id",
        },

        $project: {
          _id: 0,
        },
        $sort: {
          numTours: -1,
        },

        $limit: 6,
      },
    ]);

    res.status(200).json({
      status: "Sucess",
      data: plan,
    });
 
})

exports.getToursStatic = catchAsyncErro( async (req, res,next) => {
  // Este metodo permite calcular estaticas acerca das nossas tours
  
    const stats = await tour.aggregate([
      {
        $match:{ratingsAverage:{$gte:4.5}}
      },
    
       {

        $group:{
        _id: {$toUpper:"$difficulty"},
        numTours:{$sum :1},
         avgPrice:{$avg:"$price"},
         minPrice:{$min:"$price"},
         maxPrice:{$max:"$price"},
       }
      },
      {
        $sort:{avgPrice:1}
      }
    ]);

    res.status(200).json({
       Status:"Sucess",
       Data :{
        stats
       }

    })
})
