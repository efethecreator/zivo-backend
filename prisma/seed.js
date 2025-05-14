
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { Decimal } from '@prisma/client/runtime/library.js'

async function main() {
  console.log("🌱 Seeding...")

  await prisma.role.createMany({
    data: [
      { name: 'admin' },
      { name: 'store_owner' },
      { name: 'customer' }
    ],
    skipDuplicates: true
  })

  const admin = await prisma.user.create({
    data: {
      fullName: 'Admin',
      email: 'admin1@example.com',
      passwordHash: 'hashedadmin',
      userType: 'admin',
      isLawApproved: true,
      profile: {
        create: {
          phone: '1111111111',
          location: 'Admin City',
          gender: 'other',
          biography: 'System admin',
          photoUrl: '',
        }
      },
      roles: { create: [{ role: { connect: { name: 'admin' } } }] }
    },
    include: { profile: true }
  })

  const storeOwner = await prisma.user.create({
    data: {
      fullName: 'Store Owner',
      email: 'store1@example.com',
      passwordHash: 'hashedstore',
      userType: 'store_owner',
      isLawApproved: true,
      profile: {
        create: {
          phone: '2222222222',
          location: 'Salon Street',
          gender: 'female',
          biography: 'Owner of the best salon',
          photoUrl: '',
        }
      },
      roles: { create: [{ role: { connect: { name: 'store_owner' } } }] }
    },
    include: { profile: true }
  })

  const customer = await prisma.user.create({
    data: {
      fullName: 'Customer',
      email: 'customer1@example.com',
      passwordHash: 'hashedcustomer',
      userType: 'customer',
      isLawApproved: true,
      profile: {
        create: {
          phone: '3333333333',
          location: 'Customer Town',
          gender: 'male',
          biography: 'Loyal customer',
          photoUrl: '',
        }
      },
      roles: { create: [{ role: { connect: { name: 'customer' } } }] }
    },
    include: { profile: true }
  })

  const businessType = await prisma.businessType.create({
    data: { name: 'Kuaför' }
  })

  const workerType = await prisma.workerType.create({
    data: { name: 'Berber' }
  })

  const business = await prisma.business.create({
    data: {
      name: 'Gold Scissors',
      description: 'En iyi saç salonu',
      address: 'İstanbul, Beşiktaş',
      latitude: new Decimal('41.0438'),
      longitude: new Decimal('29.0083'),
      phone: '+90 212 555 5555',
      profileImageUrl: '',
      coverImageUrl: '',
      businessTypeId: businessType.id,
      ownerId: storeOwner.profile.id
    }
  })

  const worker = await prisma.businessWorker.create({
    data: {
      businessId: business.id,
      workerTypeId: workerType.id,
      firstName: 'Zeynep',
      lastName: 'Çelik',
      email: 'zeynep@scissors.com',
      phone: '4444444444'
    }
  })

  const service1 = await prisma.service.create({
    data: {
      businessId: business.id,
      name: 'Saç Kesimi',
      description: 'Profesyonel saç kesimi',
      price: new Decimal('250'),
      durationMinutes: 40,
      category: 'Hair',
    }
  })

  const service2 = await prisma.service.create({
    data: {
      businessId: business.id,
      name: 'Fön Çekimi',
      description: 'Günlük fön hizmeti',
      price: new Decimal('150'),
      durationMinutes: 25,
      category: 'Hair',
    }
  })

  const appointment = await prisma.appointment.create({
    data: {
      customerId: customer.profile.id,
      businessId: business.id,
      workerId: worker.id,
      appointmentTime: new Date('2025-05-01T10:00:00.000Z'),
      totalPrice: new Decimal('400'),
      status: 'completed'
    }
  })

  await prisma.appointmentService.createMany({
    data: [
      {
        appointmentId: appointment.id,
        serviceId: service1.id,
        priceAtBooking: new Decimal('250'),
        durationAtBooking: 40
      },
      {
        appointmentId: appointment.id,
        serviceId: service2.id,
        priceAtBooking: new Decimal('150'),
        durationAtBooking: 25
      }
    ]
  })

  await prisma.review.create({
    data: {
      appointmentId: appointment.id,
      rating: 5,
      comment: 'Çok memnun kaldım, harikaydı!'
    }
  })

  await prisma.favorite.create({
    data: {
      customerId: customer.profile.id,
      businessId: business.id
    }
  })

  await prisma.businessContact.create({
    data: {
      businessId: business.id,
      contactName: 'Instagram',
      contactValue: '@goldscissors'
    }
  })

  await prisma.portfolio.create({
    data: {
      businessId: business.id,
      imageUrl: 'https://placehold.co/600x400',
      description: 'Öncesi-sonrası'
    }
  })

  console.log("✅ Seed başarıyla tamamlandı.")
}

main().catch((e) => {
  console.error("❌ Seed hatası:", e)
  process.exit(1)
})
