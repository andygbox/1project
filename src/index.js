import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  	res.json({
    hello: 'Skill-Branch',
  });
});

app.get('/task2a', (req, res) => {
	const sum = (+req.query.a || 0) + (+req.query.b || 0);
	res.send(sum.toString());
});

/**
	Try task 2B
*/
app.get('/task2b', (req, res) => {
	let lname, shortname;
	let fullname = req.query.fullname.toUpperCase() || '';
  	let init = fullname ? fullname.split(" ").filter( el => el ) : 0;

  	if (init && init.length <= 3
    	&& init.every( el => !/[\d_\/]+/i.test(el))
    	) {
    	lname = init.pop();
    	lname = lname[0] + lname.slice(1).toLowerCase();
    	init = init.map( el => `${el[0]}.` );
    	shortname = [lname, ...init].join(" ");
  	} else {
    	shortname = "Invalid fullname";
  	}

 	res.send(shortname);
});

app.listen(3000, () => {
  	console.log('Your app listening on port 3000!');
});
