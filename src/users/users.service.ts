import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Users} from "./users.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {}

    async findByEmail(email: string): Promise<Users | null> {
        return this.usersRepository.findOne({where: {email}});
    }

    async create(email: string, hashedPassword: string): Promise<Users> {
        const user = this.usersRepository.create({ email, password: hashedPassword });
        return this.usersRepository.save(user);
    }

    async updateRefreshToken(userId: string, refreshToken: string | null) {
        await this.usersRepository.update(userId, { refreshToken });
    }

    async findById(id: string): Promise<Users | null> {
        return this.usersRepository.findOne({ where: { id } });
    }
}
