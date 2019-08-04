const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');
const cheerio = require('cheerio');
const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use(cors());
let url = 'https://www.game.co.za/game-za/en/All-Game-Categories/Liquor/Beers-%26-Ciders/Beers/c/G010017?q=%3Arelevance&page=';
let spiriturl ='https://www.game.co.za/game-za/en/All-Game-Categories/Liquor/Spirits/c/G0086?q=%3Arelevance&page=';

app.get('/',(req,res)=>{

    var items =[];

    request(`${url}+0`,(err,response,html)=>{
        if(!err && response.statusCode==200){
            const $ = cheerio.load(html);

            $('.product-item').each((i,elem)=>{

                const brand = $(elem).find('.brand').text().replace("\n\t\t\t\t\t\t",'');
                const name = $(elem).find('.name').text().replace("\n\t\t\t\t\t\t",'');
                const price = $(elem).find('.finalPrice').text();
                const img = $(elem).find('img').prop('src');
                const imgUrl =`https://www.game.co.za${img}`;

                

                var item={
                    "brand":brand,
                    "name":name,
                    "price":price,
                    "imageURL":imgUrl
                };
                items.push(item);
                

            });
        }
        res.json(items);

    });
    
    

});

app.get('/:id',(req,res)=>{

    var items =[];

    request(`${url}+${req.params.id}`,(err,response,html)=>{
        if(!err && response.statusCode==200){
            const $ = cheerio.load(html);

            $('.product-item').each((i,elem)=>{

                const brand = $(elem).find('.brand').text().replace("\n\t\t\t\t\t\t",'');
                const name = $(elem).find('.name').text().replace("\n\t\t\t\t\t\t",'');
                const price = $(elem).find('.finalPrice').text();
                const img = $(elem).find('img').prop('src');
                const imgUrl =`https://www.game.co.za${img}`;

                var item={
                    "brand":brand,
                    "name":name,
                    "price":price,
                    "imageURL":imgUrl
                };
                items.push(item);
                

            });
        }
        res.json(items);

    });
    
    

});


app.get('/spirits/:id',(req,res)=>{

    var items =[];

    request(`${spiriturl}+${req.params.id}`,(err,response,html)=>{
        if(!err && response.statusCode==200){
            const $ = cheerio.load(html);

            $('.product-item').each((i,elem)=>{

                const brand = $(elem).find('.brand').text().replace("\n\t\t\t\t\t\t",'');
                const name = $(elem).find('.name').text().replace("\n\t\t\t\t\t\t",'');
                const price = $(elem).find('.finalPrice').text();
                const img = $(elem).find('img').prop('src');
                const imgUrl =`https://www.game.co.za${img}`;

                var item={
                    "brand":brand,
                    "name":name,
                    "price":price,
                    "imageURL":imgUrl
                };
                items.push(item);
                

            });
        }
        res.json(items);

    });
    
    

});

app.listen(port,()=>{

    console.log(`Server running on port ${port}`);

});