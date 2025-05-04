-- CreateTable
CREATE TABLE "service_workers" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,

    CONSTRAINT "service_workers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "service_workers_serviceId_workerId_key" ON "service_workers"("serviceId", "workerId");

-- AddForeignKey
ALTER TABLE "service_workers" ADD CONSTRAINT "service_workers_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_workers" ADD CONSTRAINT "service_workers_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "business_workers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
