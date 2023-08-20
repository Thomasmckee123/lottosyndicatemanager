
import { IMessages } from '../../interfaces';
import { IGameTypes } from '../../interfaces/games';
import { prismaAsAny } from '../../test-utils/prisma';
import { prisma } from '../../utils/prisma';
import { GameTypeService } from '../gameTypes';
import { MessageService } from '../messages';

describe("GET /gameTypes", () => {



    const gameTypes :any[]= [
            {
                "id": 1,
                "name": "euro millions",
                "draw_date":new Date("2023-08-18T00:00:00.000Z"),
                "reward": 43000000,
                "image": "euromillions.png",
                "ticket_cost": 2.5
            },]

  const gameTypesResponse :any[]= [
    {
        "id": 1,
        "name": "euro millions",
        "drawDate": new Date("2023-08-18T00:00:00.000Z"),
        "reward": 43000000,
        "image": "euromillions.png",
        "ticketCost": 2.5
    },]
    
  
       
    test("get GameTypes", async () => {
        prismaAsAny.game_types = {
            findMany: jest.fn().mockResolvedValueOnce(gameTypes),
        };
        const result = await GameTypeService.getAll();
        expect(prisma.game_types.findMany).toHaveBeenCalledTimes(1);
        expect(result).toEqual(gameTypesResponse);
    });
});


describe("GET /gameTypes/:id", () => {



    const gameTypes : any= 
            {
                "id": 1,
                "name": "euro millions",
                "draw_date":new Date("2023-08-18T00:00:00.000Z"),
                "reward": 43000000,
                "image": "euromillions.png",
                "ticket_cost": 2.5
            }

  const gameTypesResponse :any= 
    {
        "id": 1,
        "name": "euro millions",
        "drawDate": new Date("2023-08-18T00:00:00.000Z"),
        "reward": 43000000,
        "image": "euromillions.png",
        "ticketCost": 2.5
    }
    
  
       
    test("get GameTypes", async () => {
        prismaAsAny.game_types = {
            findUnique: jest.fn().mockResolvedValueOnce(gameTypes),
        };
        const result = await GameTypeService.getGameTypeById(1);
        expect(prisma.game_types.findUnique).toHaveBeenCalledTimes(1);
        expect(result).toEqual(gameTypesResponse);
    });
});

describe("/update/archive",()=>{
const updatedResponse = {
    "draw_date": new Date("2023-08-18T00:00:00.000Z"),
}

test("update game types", async () => {
    prismaAsAny.game_types = {
        update: jest.fn().mockResolvedValueOnce(updatedResponse),
    };
    const result = await GameTypeService.updateDates(1);
    expect(prisma.game_types.update).toHaveBeenCalledTimes(1);
    expect(result.draw_date).toEqual(updatedResponse.draw_date);
});



})