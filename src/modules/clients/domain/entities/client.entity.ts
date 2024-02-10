import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Clients')
export default class Client {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  father_name: string;
  @Column()
  mother_name: string;
  @Column()
  phone: string;
}
