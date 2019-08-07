import { Request, Response, NextFunction } from 'express';
import * as cheerio from 'cheerio';
import { ScrapeRequest } from '../models/ScrapeRequest';
import { ScrapeResult } from '../models/ScrapeResult';

const fetchTitle = (html: CheerioStatic): string => {
  return html('h1[class=recipe-title]').text();
}

const fetchIngredients = (html: CheerioStatic): string[] => {
  const ingredients: string[] = [];
  html('div[class=recipe-ingredients]').find('li').each((index: number, element: CheerioElement) => {
    const ingredient: string = cheerio(element).text().trim();
    ingredients.push(ingredient);
  });

  return ingredients;
}

const fetchInstructions = (html: CheerioStatic): string[] => {
  const instructions: string[] = [];
  html('ul[class=recipe-directions__list]').find('li[class=recipe-directions__item]').each((index: number, element: CheerioElement) => {
    const instruction: string = cheerio(element).text().trim();
    instructions.push(instruction);
  });

  return instructions;
};

export const TasteOfHome = (req: Request, res: Response, next: NextFunction) => {
  const request: ScrapeRequest = req.body;
  if (request.url.includes('tasteofhome')) {
    const data: CheerioStatic = cheerio.load(res.locals.html);

    let result: ScrapeResult = {
      title: fetchTitle(data),
      ingredients: fetchIngredients(data),
      instructions: fetchInstructions(data)
    };

    res.send(result);
  } else {
    next();
  }
}