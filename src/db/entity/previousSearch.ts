import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export class PreviousSearch {

  @PrimaryColumn('bigint')
  timestamp: number = 0

  @Column('text')
  city: string = ''
}