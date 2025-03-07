import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const adminExists = await prisma.user.findFirst({
        where: { role: 'ADMIN' }
    });

    if (!adminExists) {
        const hashedPassword = await bcrypt.hash(
            process.env.ADMIN_PASSWORD,
            10
        );

        await prisma.user.create({
            data: {
                email: process.env.ADMIN_EMAIL,
                password: hashedPassword,
                firstName: process.env.ADMIN_FIRST_NAME,
                lastName: process.env.ADMIN_LAST_NAME,
                role: 'ADMIN',
            },
        });

        console.log('Admin user created successfully');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 