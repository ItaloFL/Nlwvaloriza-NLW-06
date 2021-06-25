import { Repository, EntityRepository } from "typeorm";
import { Compliments } from "../entities/Compliments";


@EntityRepository(Compliments)
class ComplimentsRepository extends Repository<Compliments>{



}


export { ComplimentsRepository }