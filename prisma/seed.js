import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding started...");

  const saltRounds = 10;

  const [adminRole, ownerRole, customerRole] = await Promise.all([
    prisma.role.create({ data: { name: "admin" } }),
    prisma.role.create({ data: { name: "store_owner" } }),
    prisma.role.create({ data: { name: "customer" } }),
  ]);

  const [adminPass, customerPass, ownerPass] = await Promise.all([
    bcrypt.hash("adminpass", saltRounds),
    bcrypt.hash("customerpass", saltRounds),
    bcrypt.hash("ownerpass", saltRounds),
  ]);

  const [adminUser, customerUser, storeOwnerUser] = await Promise.all([
    prisma.user.create({
      data: {
        fullName: "Admin User",
        email: "admin1@example.com",
        passwordHash: adminPass,
        userType: "admin",
        isLawApproved: true,
      },
    }),
    prisma.user.create({
      data: {
        fullName: "Customer User",
        email: "customer1@example.com",
        passwordHash: customerPass,
        userType: "customer",
        isLawApproved: true,
      },
    }),
    prisma.user.create({
      data: {
        fullName: "Store Owner",
        email: "owner1@example.com",
        passwordHash: ownerPass,
        userType: "store_owner",
        isLawApproved: true,
      },
    }),
  ]);

  await Promise.all([
    prisma.userRole.create({ data: { userId: adminUser.id, roleId: adminRole.id } }),
    prisma.userRole.create({ data: { userId: customerUser.id, roleId: customerRole.id } }),
    prisma.userRole.create({ data: { userId: storeOwnerUser.id, roleId: ownerRole.id } }),
  ]);

  const [adminProfile, customerProfile, storeOwnerProfile] = await Promise.all([
    prisma.profile.create({
      data: {
        userId: adminUser.id,
        phone: "1111111111",
        location: "Admin City",
        gender: "Other",
        biography: "I am the admin.",
        photoUrl: "",
      },
    }),
    prisma.profile.create({
      data: {
        userId: customerUser.id,
        phone: "2222222222",
        location: "Customer Town",
        gender: "Female",
        biography: "Loyal customer.",
        photoUrl: "",
      },
    }),
    prisma.profile.create({
      data: {
        userId: storeOwnerUser.id,
        phone: "3333333333",
        location: "Store District",
        gender: "Male",
        biography: "Owner of the store.",
        photoUrl: "",
      },
    }),
  ]);

  const barbershopType = await prisma.businessType.create({
    data: { name: "Barbershop" },
  });

  const business = await prisma.business.create({
    data: {
      ownerId: storeOwnerProfile.id,
      name: "Cool Cuts",
      description: "Trendy barbershop in the city.",
      address: "123 Main St",
      latitude: 40.0,
      longitude: 29.0,
      phone: "555-0101",
      profileImageUrl: "",
      coverImageUrl: "",
      businessTypeId: barbershopType.id,
      isVerified: true,
    },
  });

  const haircut = await prisma.service.create({
    data: {
      businessId: business.id,
      name: "Haircut",
      description: "Men's haircut",
      durationMinutes: 30,
      price: 100.0,
      category: "Hair",
    },
  });

  const barberType = await prisma.workerType.create({
    data: { name: "Barber" },
  });

  await prisma.businessWorker.create({
    data: {
      businessId: business.id,
      userId: storeOwnerProfile.id,
      workerTypeId: barberType.id,
    },
  });

  console.log("✅ Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
