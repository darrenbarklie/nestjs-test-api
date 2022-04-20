import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsString } from 'class-validator';

@Entity()
export class User {
  // Entity
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true, length: 255 })
  @IsEmail()
  email_address: string;

  @Column('varchar', { length: 56 })
  @IsString()
  first_name: string;

  @Column('varchar', { length: 56 })
  @IsString()
  last_name: string;
}
