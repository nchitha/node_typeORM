import {getRepository,getConnection} from "typeorm";
import { Category } from "../entity/Category";
import { Photo } from "../entity/Photo";
import { Profile } from "../entity/Profile";
import { Question } from "../entity/Question";
import { User } from "../entity/User"; 

export default class UserController {

    private userRepository = getRepository(User);
    private profileRepository = getRepository(Profile);
    private photoRepository = getRepository(Photo);
    private categoryRespository = getRepository(Category);
    private questionRespository = getRepository(Question);
    async createUser(body: any) {
        const profile = new Profile();
                profile.gender = body.gender;
                profile.photo =  body.photo;
                await this.profileRepository.manager.save(profile);
                const user = new User();
                user.firstName = body.firstName;
                user.lastName = body.lastName;
                user.age = body.age;
                user.profile = profile;
                await this.userRepository.manager.save(user);
                let photo1:any[] = [];
                body.photos.forEach(async (n, i) => {
                     photo1[i] = new Photo();
                        photo1[i].url = n;
                        photo1[i].user = user;
                        await this.photoRepository.manager.save(photo1[i]);
                 });
                
    }

    async getUser(){
    return await 
    getRepository(User)
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.profile", "profile")
    .leftJoinAndSelect("user.photos", "photo")
    .getMany();
       // return this.userRepository.find({ select: ["firstName", "lastName"] });
        ;
    }
    async deleteUser(id){
        return getConnection().createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", { id: id })
        .execute();
        
    }

    async UpdateUser(res,id){
        let update:any = {};
        
        let user = await this.userRepository.findOne(id, { relations: ["profile","photos"] });
        if(res.profile){
            user.profile = {...user.profile,...res.profile}
            
        delete res.profile;
        }
        if(res.photos){
            user.photos.map((n,i_u)=>{
                res.photos.map((m,i_r)=>{
                    if(m.id){
                        if(n.id == m.id){
                            user.photos[i_u].url =  res.photos[i_r].url;
                        }
                    }else{
                        user.photos.push(res.photo);
                    }
                });
            });
           // user.photos = {...user.photos,...res.photos}
            
        delete res.photos;
        }
        user = {...user,...res}
        return await this.userRepository.save(user);
        ;
        // return getConnection().createQueryBuilder()
        // .createQueryBuilder()
        // .update(User)
        // .set(update )
        // .where("id = :id", { id: id })
        // .execute();

        
    }

    async addCategory(res){
        const  category1= new Category();
    //     res.category.forEach(async (n, i) => {
    //          category1[i] = new Category();
    //         category1[i].name = n;
    //         await this.categoryRespository.manager.save(category1);
    //     });
    //     res.category.forEach(async (n, i) => {
    //         category1[i] = new Category();
    //        category1[i].name = n;
    //        await this.categoryRespository.manager.save(category1);
    //    });
        category1.name = res.category[1];
        await this.categoryRespository.manager.save(category1);
        const question = new Question();
        question.title = "dogs";
        question.text = "who let the dogs out?";
        question.categories = [category1];
        await this.questionRespository.manager.save(question);
    }
    
}