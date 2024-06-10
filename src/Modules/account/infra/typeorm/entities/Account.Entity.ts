import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToOne, OneToMany } from "typeorm";

import { Tokens } from "./Token.Entity";

import { Organization } from "@modules/organization/infra/typeorm/entities/organization.entity";
import { User } from "@modules/user/infra/typeorm/entities/Users.Entity";


@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @ManyToOne(() => Organization, organization => organization.accounts)
  @JoinColumn({ name: "organization_id" })
  organization?: Organization;

  @OneToOne(() => User, user => user.account)
  @JoinColumn({ name: "user_id" })
  user?: User;

  @OneToMany(() => Tokens, t => t.account)
  token: Tokens[];
  
  @Column()
  password: string;

  @Column({ name: "last_login", nullable: true })
  last_login: Date;
}
