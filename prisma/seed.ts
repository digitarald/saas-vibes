import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create sample users
  const user1 = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Regular User',
      role: 'USER',
    },
  })

  // Create sample organization
  const org = await prisma.organization.upsert({
    where: { slug: 'acme-corp' },
    update: {},
    create: {
      name: 'Acme Corporation',
      slug: 'acme-corp',
      description: 'A sample organization for development',
      planType: 'PRO',
    },
  })

  // Add users to organization
  await prisma.organizationMember.upsert({
    where: {
      userId_organizationId: {
        userId: user1.id,
        organizationId: org.id,
      },
    },
    update: {},
    create: {
      userId: user1.id,
      organizationId: org.id,
      role: 'OWNER',
    },
  })

  await prisma.organizationMember.upsert({
    where: {
      userId_organizationId: {
        userId: user2.id,
        organizationId: org.id,
      },
    },
    update: {},
    create: {
      userId: user2.id,
      organizationId: org.id,
      role: 'MEMBER',
    },
  })

  // Create sample project
  const project = await prisma.project.upsert({
    where: { id: 'sample-project' },
    update: {},
    create: {
      id: 'sample-project',
      name: 'Sample Project',
      description: 'A demo project for development',
      organizationId: org.id,
      isPublic: false,
    },
  })

  // Create sample tasks
  await prisma.task.createMany({
    data: [
      {
        title: 'Set up authentication',
        description: 'Implement Azure AD authentication',
        projectId: project.id,
        completed: true,
      },
      {
        title: 'Create dashboard',
        description: 'Build the main dashboard interface',
        projectId: project.id,
        completed: false,
      },
      {
        title: 'Add subscription management',
        description: 'Implement Stripe subscription handling',
        projectId: project.id,
        completed: false,
        dueDate: new Date('2024-02-01'),
      },
    ],
    skipDuplicates: true,
  })

  console.log('Database seeded successfully!')
  console.log(`Created users: ${user1.email}, ${user2.email}`)
  console.log(`Created organization: ${org.name} (${org.slug})`)
  console.log(`Created project: ${project.name}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
