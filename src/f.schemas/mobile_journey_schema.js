import Joi from "joi";

const gpsSchema = Joi.object({
  lat: Joi.number().allow(null),
  lng: Joi.number().allow(null),
}).allow(null);

const attendanceSchema = Joi.object({
  tipo: Joi.string().valid("externo", "interno").required(),

  ordemTipo: Joi.string().allow(null, ""),
  ordemPrefixo: Joi.string().allow(null, ""),
  ordemNumero: Joi.string().allow(null, ""),
  notaEnviada: Joi.string().valid("sim", "nao").allow(null, ""),

  deslocamentoInicio: Joi.date().iso().allow(null, ""),
  atendimentoInicio: Joi.date().iso().allow(null, ""),
  finalizadoEm: Joi.date().iso().allow(null, ""),

  gpsInicio: gpsSchema,
  gpsChegada: gpsSchema,

  endereco: Joi.object({
    cep: Joi.string().allow("", null),
    rua: Joi.string().allow("", null),
    numero: Joi.string().allow("", null),
    bairro: Joi.string().allow("", null),
    cidade: Joi.string().allow("", null),
    estado: Joi.string().allow("", null),
  }).allow(null),

  comentario: Joi.string().allow("", null),
  notas: Joi.string().allow("", null),

  rota: Joi.array().items(
    Joi.object({
      time: Joi.date().iso().required(),
      lat: Joi.number().required(),
      lng: Joi.number().required(),
    })
  ).default([]),
});

const mobile_journey_schema = Joi.object({
  employee_id: Joi.number().integer().required(),
  date: Joi.string().required(),

  // aceitando camelCase e snake_case
  inicioExpediente: Joi.date().iso().allow(null, ""),
  inicio_expediente: Joi.date().iso().allow(null, ""), 

  fimExpediente: Joi.date().iso().allow(null, ""),
  fim_expediente: Joi.date().iso().allow(null, ""),

  expedienteGps: gpsSchema,
  gps_inicio: gpsSchema,   // compatibilidade com o front atual

  almocos: Joi.array().items(Joi.object()).default([]),
  atendimentos: Joi.array().items(attendanceSchema).default([]),
  baseLogs: Joi.array().items(Joi.object()).default([]),

  assinatura: Joi.string().allow("", null),
});

export default mobile_journey_schema;
