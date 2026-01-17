-- CreateTable
CREATE TABLE "mobile_journey" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "inicio_expediente" TIMESTAMP(3),
    "fim_expediente" TIMESTAMP(3),
    "expediente_gps_lat" DOUBLE PRECISION,
    "expediente_gps_lng" DOUBLE PRECISION,
    "assinatura" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mobile_journey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mobile_lunch" (
    "id" SERIAL NOT NULL,
    "mobile_journey_id" INTEGER NOT NULL,
    "inicio" TIMESTAMP(3),
    "fim" TIMESTAMP(3),
    "lat_inicio" DOUBLE PRECISION,
    "lng_inicio" DOUBLE PRECISION,
    "lat_fim" DOUBLE PRECISION,
    "lng_fim" DOUBLE PRECISION,
    "suspenso_em" TIMESTAMP(3),
    "lat_suspenso" DOUBLE PRECISION,
    "lng_suspenso" DOUBLE PRECISION,
    "justificativa_suspensao" TEXT,
    "solicitante_suspensao" TEXT,

    CONSTRAINT "mobile_lunch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mobile_attendance" (
    "id" SERIAL NOT NULL,
    "mobile_journey_id" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "ordem_tipo" TEXT,
    "ordem_prefixo" TEXT,
    "ordem_numero" TEXT,
    "nota_enviada" BOOLEAN NOT NULL DEFAULT false,
    "deslocamento_inicio" TIMESTAMP(3),
    "atendimento_inicio" TIMESTAMP(3),
    "finalizado_em" TIMESTAMP(3),
    "gps_inicio_lat" DOUBLE PRECISION,
    "gps_inicio_lng" DOUBLE PRECISION,
    "gps_chegada_lat" DOUBLE PRECISION,
    "gps_chegada_lng" DOUBLE PRECISION,
    "cep" TEXT,
    "rua" TEXT,
    "numero" TEXT,
    "bairro" TEXT,
    "cidade" TEXT,
    "estado" TEXT,
    "comentario" TEXT,
    "notas" TEXT,

    CONSTRAINT "mobile_attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mobile_route_point" (
    "id" SERIAL NOT NULL,
    "mobile_attendance_id" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "mobile_route_point_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mobile_base_log" (
    "id" SERIAL NOT NULL,
    "mobile_journey_id" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "motivo" TEXT,

    CONSTRAINT "mobile_base_log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mobile_journey" ADD CONSTRAINT "mobile_journey_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mobile_lunch" ADD CONSTRAINT "mobile_lunch_mobile_journey_id_fkey" FOREIGN KEY ("mobile_journey_id") REFERENCES "mobile_journey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mobile_attendance" ADD CONSTRAINT "mobile_attendance_mobile_journey_id_fkey" FOREIGN KEY ("mobile_journey_id") REFERENCES "mobile_journey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mobile_route_point" ADD CONSTRAINT "mobile_route_point_mobile_attendance_id_fkey" FOREIGN KEY ("mobile_attendance_id") REFERENCES "mobile_attendance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mobile_base_log" ADD CONSTRAINT "mobile_base_log_mobile_journey_id_fkey" FOREIGN KEY ("mobile_journey_id") REFERENCES "mobile_journey"("id") ON DELETE CASCADE ON UPDATE CASCADE;
