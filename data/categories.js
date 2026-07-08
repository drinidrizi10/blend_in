const CATEGORIES = [
	{
		label: 'Animals',
		value: 'animals',
		entries: [
			{
				word: 'Elephant',
				hints: ['Trunk', 'Large', 'Gray', 'Tusks', 'Mammal'],
			},
			{
				word: 'Penguin',
				hints: ['Antarctica', 'Flightless', 'Tuxedo', 'Swim', 'Bird'],
			},
			{
				word: 'Giraffe',
				hints: ['Long neck', 'Tall', 'Spots', 'Savanna', 'Herbivore'],
			},
			{
				word: 'Chameleon',
				hints: [
					'Camouflage',
					'Lizard',
					'Color change',
					'Swivel eyes',
					'Reptile',
				],
			},
			{
				word: 'Kangaroo',
				hints: ['Pouch', 'Hop', 'Australia', 'Joey', 'Marsupial'],
			},
			{
				word: 'Dolphin',
				hints: ['Blowhole', 'Smart', 'Ocean', 'Echolocation', 'Mammal'],
			},
			{
				word: 'Cheetah',
				hints: ['Fastest', 'Spots', 'Feline', 'Sprint', 'Predator'],
			},
			{
				word: 'Platypus',
				hints: [
					'Bill',
					'Venomous',
					'Lays eggs',
					'Beaver tail',
					'Mammal',
				],
			},
			{
				word: 'Octopus',
				hints: [
					'Eight arms',
					'Ink',
					'Camouflage',
					'Suction cups',
					'Marine',
				],
			},
			{
				word: 'Flamingo',
				hints: ['Pink', 'One leg', 'Wading', 'Beak', 'Bird'],
			},
			{
				word: 'Lion',
				hints: ['Mane', 'Roar', 'Pride', 'Feline', 'King'],
			},
			{
				word: 'Tiger',
				hints: ['Stripes', 'Orange', 'Feline', 'Jungle', 'Hunter'],
			},
			{
				word: 'Bear',
				hints: ['Hibernate', 'Fur', 'Claws', 'Forest', 'Honey'],
			},
			{
				word: 'Wolf',
				hints: ['Pack', 'Howl', 'Canine', 'Alpha', 'Moon'],
			},
			{
				word: 'Shark',
				hints: ['Teeth', 'Fin', 'Ocean', 'Apex predator', 'Gills'],
			},
			{
				word: 'Eagle',
				hints: [
					'Talons',
					'Sharp vision',
					'Bird',
					'Apex predator',
					'Soar',
				],
			},
			{
				word: 'Owl',
				hints: ['Nocturnal', 'Hoot', 'Wise', 'Silent flight', 'Bird'],
			},
			{
				word: 'Frog',
				hints: ['Amphibian', 'Hop', 'Croak', 'Pond', 'Tadpole'],
			},
			{
				word: 'Snake',
				hints: ['Slither', 'Scales', 'Venom', 'Legless', 'Hiss'],
			},
			{
				word: 'Crocodile',
				hints: [
					'Reptile',
					'Sharp teeth',
					'Swamp',
					'Snout',
					'Armor skin',
				],
			},
			{
				word: 'Monkey',
				hints: ['Banana', 'Tail', 'Primate', 'Tree climber', 'Clever'],
			},
			{
				word: 'Gorilla',
				hints: ['Silverback', 'Primate', 'Chest beat', 'Ape', 'Strong'],
			},
			{
				word: 'Panda',
				hints: ['Bamboo', 'Black white', 'China', 'Bear', 'Lazy'],
			},
			{
				word: 'Koala',
				hints: [
					'Eucalyptus',
					'Australia',
					'Tree dweller',
					'Marsupial',
					'Sleepy',
				],
			},
			{
				word: 'Sloth',
				hints: ['Slow', 'Tree branch', 'Three toes', 'Lazy', 'Mammal'],
			},
			{
				word: 'Hippo',
				hints: ['River', 'Large mouth', 'Heavy', 'Africa', 'Submerged'],
			},
			{
				word: 'Rhino',
				hints: [
					'Horn',
					'Thick skin',
					'Large',
					'Endangered',
					'Herbivore',
				],
			},
			{
				word: 'Zebra',
				hints: [
					'Stripes',
					'Black white',
					'Savanna',
					'Horse-like',
					'Herd',
				],
			},
			{
				word: 'Camel',
				hints: ['Hump', 'Desert', 'Oasis', 'Spit', 'Caravan'],
			},
			{
				word: 'Deer',
				hints: ['Antlers', 'Forest', 'Fawn', 'Hooves', 'Shy'],
			},
			{
				word: 'Fox',
				hints: ['Cunning', 'Red fur', 'Bushy tail', 'Canine', 'Clever'],
			},
			{
				word: 'Squirrel',
				hints: ['Acorn', 'Nut', 'Bushy tail', 'Tree climber', 'Rodent'],
			},
			{
				word: 'Rabbit',
				hints: ['Long ears', 'Hop', 'Burrow', 'Carrot', 'Fluffy'],
			},
			{
				word: 'Mouse',
				hints: ['Cheese', 'Tiny', 'Squeak', 'Long tail', 'Rodent'],
			},
			{
				word: 'Rat',
				hints: ['Sewage', 'Long tail', 'Smart', 'Rodent', 'Pest'],
			},
			{
				word: 'Bat',
				hints: ['Nocturnal', 'Wings', 'Cave', 'Sonar', 'Mammal'],
			},
			{
				word: 'Whale',
				hints: ['Largest', 'Blowhole', 'Ocean', 'Mammal', 'Blubber'],
			},
			{
				word: 'Otter',
				hints: ['River', 'Playful', 'Seaweed', 'Hold hands', 'Fur'],
			},
			{
				word: 'Beaver',
				hints: ['Dam', 'Wood', 'Flat tail', 'Teeth', 'Rodent'],
			},
			{
				word: 'Fox',
				hints: ['Cunning', 'Red fur', 'Tail', 'Canine', 'Clever'],
			},
			{
				word: 'Sheep',
				hints: ['Wool', 'Flock', 'Bleat', 'Farm', 'Lamb'],
			},
			{
				word: 'Goat',
				hints: ['Horns', 'Beard', 'Mountain', 'Climb', 'Bleat'],
			},
			{ word: 'Cow', hints: ['Milk', 'Moo', 'Farm', 'Pasture', 'Beef'] },
			{
				word: 'Horse',
				hints: ['Gallop', 'Mane', 'Saddle', 'Hooves', 'Neigh'],
			},
			{
				word: 'Donkey',
				hints: ['Stubborn', 'Bray', 'Ears', 'Pack animal', 'Farm'],
			},
			{ word: 'Pig', hints: ['Mud', 'Oink', 'Snout', 'Pink', 'Farm'] },
			{
				word: 'Chicken',
				hints: ['Feathers', 'Eggs', 'Cluck', 'Coop', 'Bird'],
			},
			{
				word: 'Duck',
				hints: ['Quack', 'Webbed feet', 'Pond', 'Bill', 'Feathers'],
			},
			{
				word: 'Turkey',
				hints: ['Gobble', 'Feathers', 'Thanksgiving', 'Bird', 'Large'],
			},
			{
				word: 'Turtle',
				hints: ['Shell', 'Slow', 'Reptile', 'Sea', 'Beaches'],
			},
		],
	},
	{
		label: 'Food & Drinks',
		value: 'food_drinks',
		entries: [
			{
				word: 'Pizza',
				hints: ['Italian', 'Slice', 'Cheese', 'Crust', 'Pepperoni'],
			},
			{
				word: 'Burger',
				hints: ['Patty', 'Bun', 'Fast food', 'Beef', 'Lettuce'],
			},
			{
				word: 'Sushi',
				hints: ['Japan', 'Raw fish', 'Rice', 'Seaweed', 'Chopsticks'],
			},
			{
				word: 'Taco',
				hints: ['Mexico', 'Shell', 'Beef', 'Salsa', 'Crunchy'],
			},
			{
				word: 'Pasta',
				hints: ['Italian', 'Noodles', 'Sauce', 'Carbs', 'Spaghetti'],
			},
			{
				word: 'Salad',
				hints: ['Lettuce', 'Greens', 'Dressing', 'Healthy', 'Bowl'],
			},
			{
				word: 'Soup',
				hints: ['Liquid', 'Hot', 'Bowl', 'Spoon', 'Broth'],
			},
			{
				word: 'Steak',
				hints: ['Beef', 'Grill', 'Meat', 'Rare', 'Knife'],
			},
			{
				word: 'Chicken',
				hints: ['Poultry', 'Fried', 'Meat', 'Wings', 'Protein'],
			},
			{
				word: 'Salmon',
				hints: ['Fish', 'Pink meat', 'River', 'Omega-3', 'Seafood'],
			},
			{
				word: 'Rice',
				hints: ['Grain', 'White', 'Bowl', 'Staple', 'Asian'],
			},
			{
				word: 'Bread',
				hints: ['Loaf', 'Bakery', 'Slices', 'Flour', 'Toast'],
			},
			{
				word: 'Cheese',
				hints: ['Milk', 'Yellow', 'Melted', 'Dairy', 'Mice'],
			},
			{
				word: 'Egg',
				hints: ['Breakfast', 'Shell', 'Yolk', 'White', 'Omelet'],
			},
			{
				word: 'Butter',
				hints: ['Dairy', 'Yellow', 'Spread', 'Fat', 'Toast'],
			},
			{
				word: 'Yogurt',
				hints: ['Spoon', 'Dairy', 'Fruit', 'Creamy', 'Probiotics'],
			},
			{
				word: 'Ice Cream',
				hints: ['Cold', 'Cone', 'Scoop', 'Dessert', 'Sweet'],
			},
			{
				word: 'Chocolate',
				hints: ['Sweet', 'Cocoa', 'Bar', 'Dark', 'Candy'],
			},
			{
				word: 'Cake',
				hints: ['Birthday', 'Candles', 'Slice', 'Frosting', 'Dessert'],
			},
			{
				word: 'Cookie',
				hints: ['Baking', 'Chocolate chip', 'Milk', 'Sweet', 'Jar'],
			},
			{
				word: 'Apple',
				hints: ['Fruit', 'Red', 'Crunchy', 'Tree', 'Core'],
			},
			{
				word: 'Banana',
				hints: ['Yellow', 'Fruit', 'Peel', 'Monkey', 'Potassium'],
			},
			{
				word: 'Orange',
				hints: ['Citrus', 'Fruit', 'Juice', 'Vitamin C', 'Color'],
			},
			{
				word: 'Strawberry',
				hints: ['Red', 'Fruit', 'Seeds', 'Sweet', 'Berry'],
			},
			{
				word: 'Grapes',
				hints: ['Vine', 'Wine', 'Bunch', 'Fruit', 'Green'],
			},
			{
				word: 'Watermelon',
				hints: ['Summer', 'Green rind', 'Red inside', 'Seeds', 'Large'],
			},
			{
				word: 'Pineapple',
				hints: [
					'Spiky',
					'Tropical',
					'Yellow inside',
					'Pizza controversy',
					'Fruit',
				],
			},
			{
				word: 'Mango',
				hints: ['Tropical', 'Sweet', 'Stone fruit', 'Yellow', 'Juicy'],
			},
			{
				word: 'Lemon',
				hints: ['Sour', 'Yellow', 'Citrus', 'Lemonade', 'Acidic'],
			},
			{
				word: 'Tomato',
				hints: ['Red', 'Fruit', 'Salad', 'Sauce', 'Ketchup'],
			},
			{
				word: 'Potato',
				hints: ['Fries', 'Mashed', 'Underground', 'Spud', 'Starch'],
			},
			{
				word: 'Carrot',
				hints: ['Orange', 'Vegetable', 'Rabbit', 'Root', 'Crunchy'],
			},
			{
				word: 'Broccoli',
				hints: ['Green', 'Tree-like', 'Vegetable', 'Healthy', 'Stalk'],
			},
			{
				word: 'Onion',
				hints: ['Cry', 'Layers', 'Vegetable', 'Pungent', 'Bulb'],
			},
			{
				word: 'Garlic',
				hints: ['Cloves', 'Pungent', 'Vampire', 'Flavor', 'Bulb'],
			},
			{
				word: 'Coffee',
				hints: ['Caffeine', 'Morning', 'Bean', 'Hot drink', 'Mug'],
			},
			{
				word: 'Tea',
				hints: ['Bag', 'Leaves', 'Hot water', 'Mug', 'Herbal'],
			},
			{
				word: 'Milk',
				hints: ['Cow', 'White', 'Calcium', 'Glass', 'Dairy'],
			},
			{
				word: 'Water',
				hints: ['Hydration', 'Clear', 'Liquid', 'Life', 'H2O'],
			},
			{
				word: 'Juice',
				hints: ['Fruit', 'Liquid', 'Squeeze', 'Breakfast', 'Sweet'],
			},
			{
				word: 'Soda',
				hints: ['Fizzy', 'Can', 'Sweet', 'Carbonated', 'Pop'],
			},
			{
				word: 'Wine',
				hints: ['Grapes', 'Bottle', 'Glass', 'Alcohol', 'Vineyard'],
			},
			{
				word: 'Beer',
				hints: ['Alcohol', 'Malt', 'Can', 'Foam', 'Brewery'],
			},
			{
				word: 'Honey',
				hints: ['Bee', 'Sweet', 'Sticky', 'Jar', 'Golden'],
			},
			{
				word: 'Sugar',
				hints: ['Sweet', 'White', 'Crystals', 'Carbs', 'Baking'],
			},
			{
				word: 'Salt',
				hints: ['White', 'Salty', 'Ocean', 'Seasoning', 'Shaker'],
			},
			{
				word: 'Pepper',
				hints: ['Spice', 'Black', 'Shaker', 'Sneeze', 'Seasoning'],
			},
			{
				word: 'Donut',
				hints: ['Hole', 'Fried', 'Glazed', 'Sweet', 'Pastry'],
			},
			{
				word: 'Croissant',
				hints: ['French', 'Flaky', 'Pastry', 'Butter', 'Crescent'],
			},
			{
				word: 'Pancakes',
				hints: ['Syrup', 'Breakfast', 'Stack', 'Fluffy', 'Griddle'],
			},
		],
	},
	{
		label: 'Countries',
		value: 'countries',
		entries: [
			{
				word: 'USA',
				hints: [
					'Washington',
					'Dollar',
					'Superpower',
					'America',
					'States',
				],
			},
			{
				word: 'Canada',
				hints: ['Maple', 'Ottawa', 'Cold', 'North America', 'Moose'],
			},
			{
				word: 'Mexico',
				hints: ['Taco', 'Mexico City', 'Sombrero', 'Spanish', 'Amigo'],
			},
			{
				word: 'Brazil',
				hints: ['Amazon', 'Rio', 'Carnival', 'Soccer', 'Brasilia'],
			},
			{
				word: 'UK',
				hints: ['London', 'Queen', 'Big Ben', 'Island', 'Pound'],
			},
			{
				word: 'France',
				hints: ['Paris', 'Eiffel', 'Wine', 'Baguette', 'Europe'],
			},
			{
				word: 'Germany',
				hints: ['Berlin', 'Beer', 'Cars', 'Europe', 'Euro'],
			},
			{
				word: 'Italy',
				hints: ['Rome', 'Pizza', 'Pasta', 'Boot shape', 'History'],
			},
			{
				word: 'Spain',
				hints: ['Madrid', 'Tapas', 'Bullfight', 'Flamenco', 'Spanish'],
			},
			{
				word: 'Russia',
				hints: ['Moscow', 'Cold', 'Largest', 'Siberia', 'Vodka'],
			},
			{
				word: 'China',
				hints: ['Beijing', 'Great Wall', 'Panda', 'Asia', 'Population'],
			},
			{
				word: 'Japan',
				hints: ['Tokyo', 'Sushi', 'Anime', 'Samurai', 'Island'],
			},
			{
				word: 'India',
				hints: ['Delhi', 'Taj Mahal', 'Curry', 'Bollywood', 'Spices'],
			},
			{
				word: 'Australia',
				hints: ['Canberra', 'Kangaroo', 'Sydney', 'Outback', 'Island'],
			},
			{
				word: 'Egypt',
				hints: ['Cairo', 'Pyramids', 'Nile', 'Pharaoh', 'Desert'],
			},
			{
				word: 'South Africa',
				hints: ['Cape Town', 'Safari', 'Mandela', 'Gold', 'Africa'],
			},
			{
				word: 'Argentina',
				hints: [
					'Buenos Aires',
					'Tango',
					'Messi',
					'South America',
					'Beef',
				],
			},
			{
				word: 'Colombia',
				hints: [
					'Bogota',
					'Coffee',
					'South America',
					'Andes',
					'Shakira',
				],
			},
			{
				word: 'Peru',
				hints: ['Lima', 'Machu Picchu', 'Inca', 'Andes', 'Llama'],
			},
			{
				word: 'Greece',
				hints: ['Athens', 'Islands', 'Gods', 'History', 'Olives'],
			},
			{
				word: 'Turkey',
				hints: [
					'Istanbul',
					'Kebab',
					'Bazaars',
					'Two continents',
					'Ankara',
				],
			},
			{
				word: 'Saudi Arabia',
				hints: ['Riyadh', 'Oil', 'Desert', 'Mecca', 'Middle East'],
			},
			{
				word: 'Iran',
				hints: [
					'Tehran',
					'Persia',
					'Carpets',
					'History',
					'Middle East',
				],
			},
			{
				word: 'Iraq',
				hints: ['Baghdad', 'Mesopotamia', 'History', 'Oil', 'River'],
			},
			{
				word: 'Israel',
				hints: [
					'Jerusalem',
					'Tel Aviv',
					'Dead Sea',
					'History',
					'Hebrew',
				],
			},
			{
				word: 'Switzerland',
				hints: ['Bern', 'Alps', 'Chocolate', 'Watches', 'Neutral'],
			},
			{
				word: 'Sweden',
				hints: ['Stockholm', 'IKEA', 'ABBA', 'Cold', 'Europe'],
			},
			{
				word: 'Norway',
				hints: ['Oslo', 'Fjords', 'Vikings', 'Oil', 'Cold'],
			},
			{
				word: 'Finland',
				hints: ['Helsinki', 'Sauna', 'Cold', 'Happiest', 'Northern'],
			},
			{
				word: 'Netherlands',
				hints: [
					'Amsterdam',
					'Tulips',
					'Windmills',
					'Bicycles',
					'Low land',
				],
			},
			{
				word: 'Belgium',
				hints: ['Brussels', 'Waffles', 'Chocolate', 'Europe', 'Beer'],
			},
			{
				word: 'Austria',
				hints: ['Vienna', 'Alps', 'Mozart', 'Music', 'Europe'],
			},
			{
				word: 'Portugal',
				hints: ['Lisbon', 'Ronaldo', 'Ocean', 'Wine', 'Europe'],
			},
			{
				word: 'Ireland',
				hints: ['Dublin', 'Green', 'Leprechaun', 'Clover', 'Island'],
			},
			{
				word: 'New Zealand',
				hints: ['Wellington', 'Kiwi', 'Maori', 'Island', 'Scenery'],
			},
			{
				word: 'South Korea',
				hints: ['Seoul', 'K-pop', 'Samsung', 'Tech', 'Kimchi'],
			},
			{
				word: 'Thailand',
				hints: ['Bangkok', 'Temples', 'Beaches', 'Thai food', 'Monks'],
			},
			{
				word: 'Vietnam',
				hints: ['Hanoi', 'Pho', 'Motorbikes', 'Asia', 'Coffee'],
			},
			{
				word: 'Philippines',
				hints: ['Manila', 'Islands', 'Beaches', 'Tropical', 'English'],
			},
			{
				word: 'Indonesia',
				hints: ['Jakarta', 'Bali', 'Islands', 'Volcanoes', 'Tropical'],
			},
			{
				word: 'Malaysia',
				hints: [
					'Kuala Lumpur',
					'Petronas',
					'Tropical',
					'Asia',
					'Rainforest',
				],
			},
			{
				word: 'Singapore',
				hints: ['City-state', 'Clean', 'Rich', 'Asia', 'Merlion'],
			},
			{
				word: 'Pakistan',
				hints: [
					'Islamabad',
					'Cricket',
					'Mountains',
					'K2',
					'South Asia',
				],
			},
			{
				word: 'Bangladesh',
				hints: ['Dhaka', 'Rivers', 'Bengal tiger', 'Delta', 'Asia'],
			},
			{
				word: 'Nigeria',
				hints: ['Abuja', 'Lagos', 'Africa', 'Oil', 'Nollywood'],
			},
			{
				word: 'Kenya',
				hints: ['Nairobi', 'Safari', 'Runners', 'Savanna', 'Africa'],
			},
			{
				word: 'Morocco',
				hints: ['Rabat', 'Marrakech', 'Desert', 'Spices', 'Africa'],
			},
			{
				word: 'Cuba',
				hints: ['Havana', 'Cigars', 'Old cars', 'Island', 'Caribbean'],
			},
			{
				word: 'Jamaica',
				hints: [
					'Kingston',
					'Reggae',
					'Bob Marley',
					'Island',
					'Beaches',
				],
			},
			{
				word: 'Chile',
				hints: [
					'Santiago',
					'Long thin',
					'Andes',
					'South America',
					'Wine',
				],
			},
		],
	},
	{
		label: 'Professions',
		value: 'professions',
		entries: [
			{
				word: 'Doctor',
				hints: [
					'Hospital',
					'Stethoscope',
					'Medicine',
					'Heal',
					'White coat',
				],
			},
			{
				word: 'Teacher',
				hints: [
					'School',
					'Classroom',
					'Grades',
					'Students',
					'Blackboard',
				],
			},
			{
				word: 'Engineer',
				hints: [
					'Build',
					'Design',
					'Math',
					'Problem solve',
					'Structure',
				],
			},
			{
				word: 'Scientist',
				hints: [
					'Lab',
					'Research',
					'Experiment',
					'Microscope',
					'Discovery',
				],
			},
			{
				word: 'Chef',
				hints: ['Kitchen', 'Restaurant', 'Cook', 'Food', 'Hat'],
			},
			{
				word: 'Artist',
				hints: ['Paint', 'Canvas', 'Brush', 'Creative', 'Studio'],
			},
			{
				word: 'Musician',
				hints: ['Instrument', 'Music', 'Song', 'Stage', 'Concert'],
			},
			{
				word: 'Writer',
				hints: ['Book', 'Pen', 'Story', 'Type', 'Author'],
			},
			{
				word: 'Actor',
				hints: ['Movie', 'Theater', 'Stage', 'Script', 'Role'],
			},
			{
				word: 'Lawyer',
				hints: ['Court', 'Judge', 'Law', 'Client', 'Suits'],
			},
			{
				word: 'Police',
				hints: ['Badge', 'Siren', 'Arrest', 'Uniform', 'Cop'],
			},
			{
				word: 'Firefighter',
				hints: ['Hose', 'Truck', 'Fire', 'Rescue', 'Helmet'],
			},
			{
				word: 'Pilot',
				hints: ['Airplane', 'Fly', 'Cockpit', 'Sky', 'Uniform'],
			},
			{
				word: 'Astronaut',
				hints: ['Space', 'Rocket', 'NASA', 'Helmet', 'Stars'],
			},
			{
				word: 'Farmer',
				hints: ['Tractor', 'Crops', 'Barn', 'Fields', 'Animals'],
			},
			{
				word: 'Soldier',
				hints: ['Army', 'Weapon', 'Uniform', 'Combat', 'Base'],
			},
			{
				word: 'Nurse',
				hints: ['Hospital', 'Care', 'Doctor', 'Scrubs', 'Medical'],
			},
			{
				word: 'Dentist',
				hints: ['Teeth', 'Floss', 'Cavity', 'Smile', 'Drill'],
			},
			{
				word: 'Architect',
				hints: [
					'Blueprint',
					'Buildings',
					'Design',
					'Drafting',
					'Office',
				],
			},
			{
				word: 'Journalist',
				hints: ['News', 'Report', 'Interview', 'Article', 'Press'],
			},
			{
				word: 'Photographer',
				hints: ['Camera', 'Lens', 'Flash', 'Picture', 'Shoot'],
			},
			{
				word: 'Mechanic',
				hints: ['Tools', 'Car', 'Garage', 'Fix', 'Engine'],
			},
			{
				word: 'Electrician',
				hints: ['Wires', 'Power', 'Shock', 'Tools', 'Lights'],
			},
			{
				word: 'Plumber',
				hints: ['Pipes', 'Sink', 'Water', 'Wrench', 'Leak'],
			},
			{
				word: 'Carpenter',
				hints: ['Wood', 'Hammer', 'Saw', 'Build', 'Furniture'],
			},
			{
				word: 'Baker',
				hints: ['Bread', 'Oven', 'Flour', 'Bakery', 'Cake'],
			},
			{
				word: 'Butcher',
				hints: ['Meat', 'Knife', 'Shop', 'Cleaver', 'Steak'],
			},
			{
				word: 'Barber',
				hints: ['Haircut', 'Scissors', 'Razor', 'Chair', 'Beard'],
			},
			{
				word: 'Athlete',
				hints: ['Sports', 'Train', 'Game', 'Gym', 'Fit'],
			},
			{
				word: 'Politician',
				hints: ['Vote', 'Government', 'Speech', 'Election', 'Office'],
			},
			{
				word: 'Judge',
				hints: ['Gavel', 'Court', 'Robe', 'Verdict', 'Law'],
			},
			{
				word: 'Librarian',
				hints: ['Books', 'Quiet', 'Shelves', 'Reading', 'Catalog'],
			},
			{
				word: 'Cashier',
				hints: ['Register', 'Money', 'Store', 'Receipt', 'Scan'],
			},
			{
				word: 'Waiter',
				hints: ['Menu', 'Table', 'Restaurant', 'Tip', 'Order'],
			},
			{
				word: 'Flight Attendant',
				hints: ['Airplane', 'Safety', 'Passengers', 'Cabin', 'Travel'],
			},
			{
				word: 'Sailor',
				hints: ['Ship', 'Ocean', 'Boat', 'Navy', 'Anchor'],
			},
			{
				word: 'Fisherman',
				hints: ['Net', 'Rod', 'Fish', 'Boat', 'Ocean'],
			},
			{
				word: 'Miner',
				hints: ['Coal', 'Underground', 'Helmet', 'Gold', 'Pickaxe'],
			},
			{
				word: 'Cleaner',
				hints: ['Mop', 'Broom', 'Dust', 'Wash', 'Janitor'],
			},
			{
				word: 'Guard',
				hints: ['Security', 'Watch', 'Protect', 'Gate', 'Uniform'],
			},
			{
				word: 'Designer',
				hints: ['Fashion', 'Graphic', 'Creative', 'Style', 'Sketch'],
			},
			{
				word: 'Programmer',
				hints: ['Code', 'Computer', 'Software', 'Bugs', 'Keyboard'],
			},
			{
				word: 'Accountant',
				hints: ['Taxes', 'Numbers', 'Math', 'Audit', 'Finance'],
			},
			{
				word: 'Manager',
				hints: ['Boss', 'Team', 'Office', 'Meeting', 'Lead'],
			},
			{
				word: 'Secretary',
				hints: ['Typing', 'Phone calls', 'Desk', 'Schedule', 'Office'],
			},
			{
				word: 'Driver',
				hints: ['Taxi', 'Bus', 'Wheel', 'Road', 'Transport'],
			},
			{
				word: 'Postman',
				hints: ['Mail', 'Letter', 'Delivery', 'Bag', 'Mailbox'],
			},
			{
				word: 'Tailor',
				hints: ['Sew', 'Suit', 'Fabric', 'Needle', 'Measure'],
			},
			{
				word: 'Gardener',
				hints: ['Plants', 'Flowers', 'Soil', 'Yard', 'Greenhouse'],
			},
			{
				word: 'Model',
				hints: ['Runway', 'Fashion', 'Photo', 'Pose', 'Clothes'],
			},
		],
	},
	{
		label: 'Sports',
		value: 'sports',
		entries: [
			{
				word: 'Soccer',
				hints: ['Ball', 'Goal', 'Kick', 'Pitch', 'Eleven'],
			},
			{
				word: 'Basketball',
				hints: ['Hoop', 'Dribble', 'Court', 'Net', 'Dunk'],
			},
			{
				word: 'Tennis',
				hints: ['Racket', 'Net', 'Ball', 'Court', 'Serve'],
			},
			{
				word: 'Baseball',
				hints: ['Bat', 'Glove', 'Home run', 'Diamond', 'Pitcher'],
			},
			{
				word: 'Cricket',
				hints: ['Bat', 'Wicket', 'Pitch', 'Overs', 'Eleven'],
			},
			{
				word: 'Rugby',
				hints: ['Oval ball', 'Tackle', 'Scrum', 'Pitch', 'Try'],
			},
			{
				word: 'Football',
				hints: [
					'Helmet',
					'Touchdown',
					'Gridiron',
					'Quarterback',
					'Tackle',
				],
			},
			{ word: 'Golf', hints: ['Club', 'Hole', 'Green', 'Tee', 'Ball'] },
			{
				word: 'Volleyball',
				hints: ['Net', 'Spike', 'Ball', 'Court', 'Beach'],
			},
			{
				word: 'Badminton',
				hints: ['Racket', 'Shuttlecock', 'Net', 'Court', 'Smash'],
			},
			{
				word: 'Swimming',
				hints: ['Pool', 'Water', 'Goggles', 'Stroke', 'Trunks'],
			},
			{
				word: 'Running',
				hints: ['Track', 'Shoes', 'Race', 'Sprint', 'Marathon'],
			},
			{
				word: 'Cycling',
				hints: ['Bicycle', 'Helmet', 'Pedal', 'Wheels', 'Race'],
			},
			{
				word: 'Boxing',
				hints: ['Gloves', 'Ring', 'Punch', 'KO', 'Rounds'],
			},
			{
				word: 'Wrestling',
				hints: ['Mat', 'Ring', 'Grapple', 'Pin', 'Belt'],
			},
			{
				word: 'Gymnastics',
				hints: ['Mat', 'Beam', 'Flip', 'Flexible', 'Vault'],
			},
			{
				word: 'Skiing',
				hints: ['Snow', 'Poles', 'Mountain', 'Winter', 'Slopes'],
			},
			{
				word: 'Snowboarding',
				hints: ['Snow', 'Board', 'Mountain', 'Winter', 'Slopes'],
			},
			{
				word: 'Ice Hockey',
				hints: ['Puck', 'Stick', 'Ice', 'Skates', 'Goalie'],
			},
			{
				word: 'Figure Skating',
				hints: ['Ice', 'Skates', 'Dance', 'Music', 'Spin'],
			},
			{
				word: 'Surfing',
				hints: ['Board', 'Wave', 'Ocean', 'Beach', 'Wetsuit'],
			},
			{
				word: 'Skateboarding',
				hints: ['Board', 'Wheels', 'Ramp', 'Deck', 'Tricks'],
			},
			{
				word: 'Archery',
				hints: ['Bow', 'Arrow', 'Target', 'Bullseye', 'Quiver'],
			},
			{
				word: 'Shooting',
				hints: ['Gun', 'Target', 'Bullet', 'Range', 'Aim'],
			},
			{
				word: 'Fencing',
				hints: ['Sword', 'Mask', 'Epee', 'Strip', 'White suit'],
			},
			{
				word: 'Rowing',
				hints: ['Boat', 'Oar', 'Water', 'Team', 'River'],
			},
			{
				word: 'Sailing',
				hints: ['Boat', 'Wind', 'Sail', 'Ocean', 'Water'],
			},
			{
				word: 'Weightlifting',
				hints: ['Barbell', 'Weights', 'Gym', 'Strong', 'Lift'],
			},
			{
				word: 'Martial Arts',
				hints: ['Belt', 'Dojo', 'Kick', 'Punch', 'Karate'],
			},
			{
				word: 'Table Tennis',
				hints: ['Paddle', 'Ping pong', 'Table', 'Net', 'Ball'],
			},
			{
				word: 'Bowling',
				hints: ['Pins', 'Ball', 'Lane', 'Strike', 'Shoes'],
			},
			{
				word: 'Darts',
				hints: ['Board', 'Flights', 'Throw', 'Bullseye', 'Pub'],
			},
			{
				word: 'Billiards',
				hints: ['Cue', 'Balls', 'Table', 'Pockets', 'Pool'],
			},
			{
				word: 'Chess',
				hints: ['Board', 'Pieces', 'King', 'Strategy', 'Mind'],
			},
			{
				word: 'Climbing',
				hints: ['Rope', 'Wall', 'Rock', 'Harness', 'Mountain'],
			},
			{
				word: 'Hiking',
				hints: ['Trail', 'Boots', 'Backpack', 'Mountain', 'Nature'],
			},
			{
				word: 'Fishing',
				hints: ['Rod', 'Bait', 'Hook', 'Water', 'Fish'],
			},
			{
				word: 'Hunting',
				hints: ['Gun', 'Animal', 'Forest', 'Camouflage', 'Track'],
			},
			{
				word: 'Horse Racing',
				hints: ['Jockey', 'Horse', 'Track', 'Saddle', 'Bet'],
			},
			{
				word: 'Motor Racing',
				hints: ['Car', 'Track', 'Speed', 'Helmet', 'F1'],
			},
			{
				word: 'Yoga',
				hints: ['Mat', 'Stretch', 'Pose', 'Breathing', 'Calm'],
			},
			{
				word: 'Pilates',
				hints: ['Mat', 'Core', 'Stretch', 'Exercise', 'Fitness'],
			},
			{
				word: 'Cheerleading',
				hints: ['Pom poms', 'Dance', 'Stunt', 'Jump', 'Team'],
			},
			{
				word: 'Dance',
				hints: ['Music', 'Steps', 'Rhythm', 'Stage', 'Shoes'],
			},
			{
				word: 'Lacrosse',
				hints: ['Stick', 'Net', 'Ball', 'Field', 'Helmet'],
			},
			{
				word: 'Handball',
				hints: ['Ball', 'Goal', 'Court', 'Throw', 'Team'],
			},
			{
				word: 'Water Polo',
				hints: ['Pool', 'Ball', 'Goal', 'Swim', 'Cap'],
			},
			{
				word: 'Triathlon',
				hints: ['Swim', 'Bike', 'Run', 'Race', 'Endurance'],
			},
			{
				word: 'Marathon',
				hints: ['Run', '26 miles', 'Race', 'Road', 'Endurance'],
			},
			{
				word: 'Sumo',
				hints: ['Wrestler', 'Heavy', 'Ring', 'Japan', 'Push'],
			},
		],
	},
	{
		label: 'Household Items',
		value: 'household_items',
		entries: [
			{
				word: 'Chair',
				hints: ['Sit', 'Legs', 'Furniture', 'Back', 'Seat'],
			},
			{
				word: 'Table',
				hints: ['Four legs', 'Surface', 'Furniture', 'Eat', 'Desk'],
			},
			{
				word: 'Sofa',
				hints: [
					'Couch',
					'Sit',
					'Living room',
					'Cushions',
					'Comfortable',
				],
			},
			{
				word: 'Bed',
				hints: ['Sleep', 'Mattress', 'Pillow', 'Blanket', 'Bedroom'],
			},
			{
				word: 'Wardrobe',
				hints: ['Clothes', 'Hangers', 'Closet', 'Bedroom', 'Storage'],
			},
			{
				word: 'Mirror',
				hints: ['Reflection', 'Glass', 'Wall', 'Look', 'Vanity'],
			},
			{
				word: 'Clock',
				hints: ['Time', 'Hands', 'Wall', 'Tick', 'Alarm'],
			},
			{
				word: 'Lamp',
				hints: ['Light', 'Bulb', 'Shade', 'Desk', 'Switch'],
			},
			{
				word: 'Television',
				hints: ['Screen', 'Remote', 'Watch', 'Shows', 'Display'],
			},
			{
				word: 'Refrigerator',
				hints: ['Cold', 'Food', 'Kitchen', 'Fridge', 'Ice'],
			},
			{
				word: 'Oven',
				hints: ['Hot', 'Bake', 'Cook', 'Kitchen', 'Stove'],
			},
			{
				word: 'Microwave',
				hints: ['Hot', 'Fast', 'Kitchen', 'Timer', 'Beep'],
			},
			{
				word: 'Washing Machine',
				hints: ['Laundry', 'Clothes', 'Water', 'Spin', 'Clean'],
			},
			{
				word: 'Vacuum Cleaner',
				hints: ['Carpet', 'Dust', 'Suction', 'Floor', 'Loud'],
			},
			{
				word: 'Toaster',
				hints: ['Bread', 'Slice', 'Breakfast', 'Pop up', 'Brown'],
			},
			{
				word: 'Kettle',
				hints: ['Boil', 'Water', 'Tea', 'Hot', 'Kitchen'],
			},
			{
				word: 'Blender',
				hints: ['Smoothie', 'Blades', 'Mix', 'Fruit', 'Liquid'],
			},
			{
				word: 'Iron',
				hints: ['Clothes', 'Hot', 'Steam', 'Wrinkles', 'Smooth'],
			},
			{ word: 'Fan', hints: ['Wind', 'Blades', 'Cool', 'Air', 'Spin'] },
			{
				word: 'Heater',
				hints: ['Warm', 'Hot', 'Winter', 'Cold', 'Room'],
			},
			{
				word: 'Sink',
				hints: ['Water', 'Faucet', 'Wash', 'Kitchen', 'Bathroom'],
			},
			{
				word: 'Toilet',
				hints: ['Bathroom', 'Flush', 'Water', 'Bowl', 'Paper'],
			},
			{
				word: 'Shower',
				hints: ['Water', 'Bathroom', 'Wash', 'Clean', 'Curtain'],
			},
			{
				word: 'Bathtub',
				hints: ['Water', 'Soak', 'Bathroom', 'Tub', 'Bath'],
			},
			{
				word: 'Pillow',
				hints: ['Bed', 'Head', 'Soft', 'Sleep', 'Cushion'],
			},
			{
				word: 'Blanket',
				hints: ['Bed', 'Warm', 'Cover', 'Sleep', 'Cold'],
			},
			{
				word: 'Curtain',
				hints: ['Window', 'Fabric', 'Shade', 'Hang', 'Blind'],
			},
			{
				word: 'Rug',
				hints: ['Floor', 'Carpet', 'Ground', 'Soft', 'Room'],
			},
			{
				word: 'Towel',
				hints: ['Dry', 'Bathroom', 'Water', 'Shower', 'Fabric'],
			},
			{
				word: 'Broom',
				hints: ['Sweep', 'Floor', 'Dust', 'Handle', 'Clean'],
			},
			{
				word: 'Mop',
				hints: ['Floor', 'Water', 'Bucket', 'Wet', 'Clean'],
			},
			{
				word: 'Trash Can',
				hints: ['Garbage', 'Waste', 'Bin', 'Bag', 'Throw'],
			},
			{
				word: 'Plate',
				hints: ['Food', 'Eat', 'Dish', 'Round', 'Kitchen'],
			},
			{
				word: 'Bowl',
				hints: ['Soup', 'Cereal', 'Dish', 'Round', 'Deep'],
			},
			{
				word: 'Cup',
				hints: ['Drink', 'Handle', 'Mug', 'Liquid', 'Coffee'],
			},
			{
				word: 'Glass',
				hints: ['Drink', 'Clear', 'Water', 'Liquid', 'Breakable'],
			},
			{
				word: 'Fork',
				hints: ['Eat', 'Prongs', 'Silverware', 'Food', 'Utensil'],
			},
			{
				word: 'Spoon',
				hints: ['Eat', 'Soup', 'Silverware', 'Scoop', 'Utensil'],
			},
			{
				word: 'Knife',
				hints: ['Cut', 'Sharp', 'Blade', 'Silverware', 'Utensil'],
			},
			{
				word: 'Pan',
				hints: ['Cook', 'Fry', 'Kitchen', 'Stove', 'Handle'],
			},
			{
				word: 'Pot',
				hints: ['Cook', 'Boil', 'Soup', 'Kitchen', 'Stove'],
			},
			{ word: 'Key', hints: ['Lock', 'Door', 'Open', 'Metal', 'Ring'] },
			{
				word: 'Wallet',
				hints: ['Money', 'Cards', 'Pocket', 'Leather', 'Cash'],
			},
			{
				word: 'Umbrella',
				hints: ['Rain', 'Wet', 'Sky', 'Open', 'Handle'],
			},
			{
				word: 'Torch',
				hints: ['Light', 'Flashlight', 'Dark', 'Battery', 'Beam'],
			},
			{
				word: 'Scissors',
				hints: ['Cut', 'Paper', 'Sharp', 'Blades', 'Tools'],
			},
			{
				word: 'Hammer',
				hints: ['Nail', 'Tool', 'Hit', 'Wood', 'Handle'],
			},
			{
				word: 'Screwdriver',
				hints: ['Screw', 'Tool', 'Turn', 'Fix', 'Handle'],
			},
			{
				word: 'Ladder',
				hints: ['Climb', 'High', 'Steps', 'Rungs', 'Wall'],
			},
			{
				word: 'Soap',
				hints: ['Wash', 'Clean', 'Bathroom', 'Bubbles', 'Bar'],
			},
		],
	},
	{
		label: 'Clothing & Accessories',
		value: 'clothing_accessories',
		entries: [
			{
				word: 'Shirt',
				hints: ['Buttons', 'Collar', 'Wear', 'Torso', 'Sleeves'],
			},
			{
				word: 'T-shirt',
				hints: ['Casual', 'Short sleeves', 'Cotton', 'Wear', 'Torso'],
			},
			{
				word: 'Pants',
				hints: ['Legs', 'Jeans', 'Trousers', 'Zipped', 'Pockets'],
			},
			{
				word: 'Shorts',
				hints: ['Legs', 'Summer', 'Short', 'Casual', 'Warm'],
			},
			{
				word: 'Skirt',
				hints: ['Legs', 'Waist', 'Hang', 'Women', 'Spin'],
			},
			{
				word: 'Dress',
				hints: ['One-piece', 'Gown', 'Women', 'Party', 'Wear'],
			},
			{
				word: 'Jacket',
				hints: ['Coat', 'Outerwear', 'Cold', 'Zipped', 'Warm'],
			},
			{
				word: 'Sweater',
				hints: ['Knit', 'Warm', 'Cold', 'Wool', 'Pullover'],
			},
			{
				word: 'Hoodie',
				hints: ['Cap', 'Pocket', 'Sweatshirt', 'Casual', 'Warm'],
			},
			{
				word: 'Suit',
				hints: ['Formal', 'Jacket', 'Tie', 'Business', 'Pants'],
			},
			{
				word: 'Tie',
				hints: ['Neck', 'Formal', 'Suit', 'Knot', 'Collar'],
			},
			{ word: 'Socks', hints: ['Feet', 'Shoes', 'Warm', 'Pair', 'Toes'] },
			{ word: 'Shoes', hints: ['Feet', 'Walk', 'Laces', 'Sole', 'Pair'] },
			{
				word: 'Sneakers',
				hints: ['Shoes', 'Sports', 'Casual', 'Laces', 'Run'],
			},
			{
				word: 'Boots',
				hints: ['Shoes', 'Heavy', 'Winter', 'Leather', 'Feet'],
			},
			{
				word: 'Sandals',
				hints: ['Shoes', 'Summer', 'Open', 'Feet', 'Straps'],
			},
			{
				word: 'Slippers',
				hints: ['Shoes', 'Home', 'Indoor', 'Soft', 'Feet'],
			},
			{ word: 'Hat', hints: ['Head', 'Cap', 'Sun', 'Wear', 'Brim'] },
			{
				word: 'Cap',
				hints: ['Head', 'Sports', 'Brim', 'Baseball', 'Hat'],
			},
			{
				word: 'Beanie',
				hints: ['Head', 'Winter', 'Knit', 'Warm', 'Hat'],
			},
			{
				word: 'Gloves',
				hints: ['Hands', 'Fingers', 'Winter', 'Warm', 'Pair'],
			},
			{
				word: 'Scarf',
				hints: ['Neck', 'Winter', 'Warm', 'Knit', 'Long'],
			},
			{
				word: 'Belt',
				hints: ['Waist', 'Pants', 'Buckle', 'Leather', 'Hold'],
			},
			{
				word: 'Glasses',
				hints: ['Eyes', 'Vision', 'Frames', 'Lens', 'See'],
			},
			{
				word: 'Sunglasses',
				hints: ['Eyes', 'Sun', 'Dark', 'Shades', 'Summer'],
			},
			{
				word: 'Watch',
				hints: ['Wrist', 'Time', 'Clock', 'Straps', 'Dial'],
			},
			{
				word: 'Ring',
				hints: ['Finger', 'Jewelry', 'Gold', 'Diamond', 'Marry'],
			},
			{
				word: 'Necklace',
				hints: ['Neck', 'Jewelry', 'Chain', 'Pendant', 'Gold'],
			},
			{
				word: 'Bracelet',
				hints: ['Wrist', 'Jewelry', 'Chain', 'Arm', 'Gold'],
			},
			{
				word: 'Earrings',
				hints: ['Ears', 'Jewelry', 'Pair', 'Pierce', 'Lobe'],
			},
			{
				word: 'Bag',
				hints: ['Carry', 'Handbag', 'Purse', 'Items', 'Straps'],
			},
			{
				word: 'Backpack',
				hints: ['Bag', 'Back', 'School', 'Straps', 'Carry'],
			},
			{
				word: 'Purse',
				hints: ['Bag', 'Women', 'Money', 'Handbag', 'Carry'],
			},
			{
				word: 'Wallet',
				hints: ['Money', 'Cards', 'Pocket', 'Leather', 'Cash'],
			},
			{
				word: 'Umbrella',
				hints: ['Rain', 'Wet', 'Sky', 'Open', 'Handle'],
			},
			{
				word: 'Raincoat',
				hints: ['Rain', 'Wet', 'Waterproof', 'Jacket', 'Hood'],
			},
			{
				word: 'Swimsuit',
				hints: ['Pool', 'Swim', 'Beach', 'Bikini', 'Water'],
			},
			{
				word: 'Pyjamas',
				hints: ['Sleep', 'Bed', 'Night', 'Clothes', 'Soft'],
			},
			{
				word: 'Underwear',
				hints: [
					'Bottom',
					'First layer',
					'Clothes',
					'Hidden',
					'Elastic',
				],
			},
			{
				word: 'Bra',
				hints: ['Women', 'Underwear', 'Chest', 'Straps', 'Support'],
			},
			{
				word: 'Coat',
				hints: ['Long', 'Winter', 'Heavy', 'Jacket', 'Warm'],
			},
			{
				word: 'Vest',
				hints: ['Sleeveless', 'Jacket', 'Torso', 'Layer', 'Button'],
			},
			{
				word: 'Uniform',
				hints: ['School', 'Work', 'Same', 'Match', 'Clothes'],
			},
			{
				word: 'Costume',
				hints: ['Party', 'Halloween', 'Dress up', 'Role', 'Disguise'],
			},
			{
				word: 'Mask',
				hints: ['Face', 'Hide', 'Cover', 'Halloween', 'Eyes'],
			},
			{
				word: 'Crown',
				hints: ['Head', 'King', 'Queen', 'Gold', 'Jewels'],
			},
			{
				word: 'Helmet',
				hints: ['Head', 'Safety', 'Bike', 'Hard', 'Protect'],
			},
			{
				word: 'Apron',
				hints: ['Kitchen', 'Cook', 'Chef', 'Protect', 'Tie'],
			},
			{
				word: 'Hairband',
				hints: ['Hair', 'Head', 'Band', 'Hold', 'Accessory'],
			},
			{
				word: 'Tie-pin',
				hints: ['Tie', 'Suit', 'Clip', 'Metal', 'Accessory'],
			},
		],
	},
	{
		label: 'Vehicles & Transport',
		value: 'vehicles_transport',
		entries: [
			{
				word: 'Car',
				hints: ['Four wheels', 'Road', 'Drive', 'Engine', 'Garage'],
			},
			{
				word: 'Bicycle',
				hints: ['Two wheels', 'Pedal', 'Chain', 'Ride', 'Helmet'],
			},
			{
				word: 'Motorcycle',
				hints: ['Two wheels', 'Engine', 'Fast', 'Ride', 'Helmet'],
			},
			{
				word: 'Bus',
				hints: ['Large', 'Passengers', 'Public', 'Stop', 'Driver'],
			},
			{
				word: 'Train',
				hints: ['Tracks', 'Rail', 'Engine', 'Station', 'Cabs'],
			},
			{
				word: 'Airplane',
				hints: ['Fly', 'Wings', 'Sky', 'Pilot', 'Airport'],
			},
			{
				word: 'Helicopter',
				hints: ['Blades', 'Fly', 'Rotor', 'Sky', 'Chopper'],
			},
			{ word: 'Boat', hints: ['Water', 'River', 'Sail', 'Row', 'Lake'] },
			{
				word: 'Ship',
				hints: ['Large boat', 'Ocean', 'Sea', 'Cruise', 'Captain'],
			},
			{
				word: 'Submarine',
				hints: ['Underwater', 'Ocean', 'Navy', 'Sonar', 'Sub'],
			},
			{
				word: 'Truck',
				hints: ['Large', 'Cargo', 'Haul', 'Wheels', 'Lorry'],
			},
			{
				word: 'Van',
				hints: [
					'Cargo',
					'Large car',
					'Delivery',
					'Family',
					'Sliding door',
				],
			},
			{
				word: 'Taxi',
				hints: ['Yellow', 'Fare', 'Cab', 'Driver', 'Passenger'],
			},
			{
				word: 'Ambulance',
				hints: [
					'Siren',
					'Hospital',
					'Emergency',
					'Medical',
					'Red cross',
				],
			},
			{
				word: 'Fire Truck',
				hints: ['Red', 'Siren', 'Hose', 'Ladder', 'Firefighter'],
			},
			{
				word: 'Police Car',
				hints: ['Siren', 'Cops', 'Blue lights', 'Patrol', 'Arrest'],
			},
			{
				word: 'Scooter',
				hints: ['Two wheels', 'Kick', 'Handlebar', 'Ride', 'Small'],
			},
			{
				word: 'Skateboard',
				hints: ['Four wheels', 'Board', 'Deck', 'Tricks', 'Skate'],
			},
			{
				word: 'Tractor',
				hints: [
					'Farmer',
					'Field',
					'Big wheels',
					'Farm',
					'Agricultural',
				],
			},
			{
				word: 'Rocket',
				hints: ['Space', 'NASA', 'Fly', 'Astronaut', 'Launch'],
			},
			{
				word: 'Spaceship',
				hints: ['Space', 'Stars', 'Alien', 'Astronaut', 'Fly'],
			},
			{
				word: 'Ferry',
				hints: [
					'Boat',
					'Water',
					'Car transport',
					'Passengers',
					'Crossing',
				],
			},
			{
				word: 'Yacht',
				hints: ['Luxury', 'Boat', 'Rich', 'Ocean', 'Sail'],
			},
			{
				word: 'Canoe',
				hints: ['Boat', 'Oar', 'Paddle', 'River', 'Narrow'],
			},
			{
				word: 'Kayak',
				hints: ['Boat', 'Paddle', 'Water', 'One person', 'Sport'],
			},
			{
				word: 'Raft',
				hints: ['Inflatable', 'River', 'Water', 'Float', 'Rubber'],
			},
			{
				word: 'Tram',
				hints: ['Tracks', 'City', 'Electric', 'Streetcar', 'Public'],
			},
			{
				word: 'Metro',
				hints: ['Underground', 'Subway', 'Train', 'City', 'Public'],
			},
			{
				word: 'Cable Car',
				hints: ['Hanging', 'Wire', 'Mountain', 'Sky', 'Ski'],
			},
			{
				word: 'Hot Air Balloon',
				hints: ['Basket', 'Fly', 'Gas', 'Sky', 'Float'],
			},
			{
				word: 'Glider',
				hints: ['Fly', 'No engine', 'Wings', 'Sky', 'Soar'],
			},
			{
				word: 'Jet Ski',
				hints: ['Water', 'Motorcycle', 'Ocean', 'Fast', 'Wave'],
			},
			{
				word: 'Snowmobile',
				hints: ['Snow', 'Winter', 'Tracks', 'Engine', 'Drive'],
			},
			{
				word: 'Golf Cart',
				hints: ['Small', 'Electric', 'Course', 'Wheels', 'Drive'],
			},
			{
				word: 'Forklift',
				hints: ['Warehouse', 'Lifting', 'Prongs', 'Cargo', 'Pallet'],
			},
			{
				word: 'Bulldozer',
				hints: ['Construction', 'Tracks', 'Blade', 'Push', 'Heavy'],
			},
			{
				word: 'Excavator',
				hints: ['Construction', 'Digger', 'Bucket', 'Arm', 'Heavy'],
			},
			{
				word: 'Crane',
				hints: ['High', 'Lifting', 'Construction', 'Hook', 'Cable'],
			},
			{
				word: 'Segway',
				hints: [
					'Two wheels',
					'Stand',
					'Electric',
					'Handlebar',
					'Balance',
				],
			},
			{
				word: 'Hoverboard',
				hints: ['Two wheels', 'Electric', 'Balance', 'Feet', 'Roll'],
			},
			{
				word: 'Caravan',
				hints: ['Trailer', 'Camper', 'Towed', 'Home', 'Travel'],
			},
			{
				word: 'Amphibious Vehicle',
				hints: ['Land', 'Water', 'Both', 'Wheels', 'Boat'],
			},
			{
				word: 'Monster Truck',
				hints: ['Huge wheels', 'Crush', 'Show', 'Loud', 'Jump'],
			},
			{
				word: 'Go-Kart',
				hints: ['Small car', 'Track', 'Racing', 'Low', 'Engine'],
			},
			{
				word: 'Rickshaw',
				hints: ['Three wheels', 'Asia', 'Pedal', 'Passenger', 'Pull'],
			},
			{ word: 'Sled', hints: ['Snow', 'Dogs', 'Winter', 'Slide', 'Ice'] },
			{
				word: 'Chariot',
				hints: ['Horse', 'Ancient', 'Wheels', 'Roman', 'Race'],
			},
			{
				word: 'Wagon',
				hints: ['Four wheels', 'Wooden', 'Horse drawn', 'Old', 'Cargo'],
			},
			{
				word: 'Blimp',
				hints: ['Airship', 'Gas', 'Sky', 'Large', 'Float'],
			},
			{
				word: 'Cruise Ship',
				hints: ['Huge', 'Vacation', 'Ocean', 'Hotel', 'Passengers'],
			},
		],
	},
	{
		label: 'School & Office',
		value: 'school_office',
		entries: [
			{
				word: 'Pen',
				hints: ['Ink', 'Write', 'Paper', 'Ballpoint', 'Cap'],
			},
			{
				word: 'Pencil',
				hints: ['Lead', 'Graphite', 'Write', 'Eraser', 'Wood'],
			},
			{
				word: 'Eraser',
				hints: ['Rub out', 'Pencil', 'Mistake', 'Rubber', 'Clean'],
			},
			{
				word: 'Ruler',
				hints: ['Measure', 'Straight line', 'Inches', 'Cm', 'Plastic'],
			},
			{
				word: 'Notebook',
				hints: ['Paper', 'Pages', 'Write', 'Notes', 'Bound'],
			},
			{
				word: 'Book',
				hints: ['Read', 'Pages', 'Cover', 'Story', 'Library'],
			},
			{
				word: 'Desk',
				hints: ['Table', 'Sit', 'Work', 'Office', 'Chair'],
			},
			{
				word: 'Chair',
				hints: ['Sit', 'Office', 'Desk', 'Wheels', 'Comfort'],
			},
			{
				word: 'Computer',
				hints: ['Screen', 'Keyboard', 'PC', 'Work', 'Digital'],
			},
			{
				word: 'Laptop',
				hints: ['Portable PC', 'Screen', 'Keyboard', 'Fold', 'Battery'],
			},
			{
				word: 'Keyboard',
				hints: ['Type', 'Keys', 'Buttons', 'Computer', 'Board'],
			},
			{
				word: 'Mouse',
				hints: ['Click', 'Computer', 'Cursor', 'Hand', 'Scroll'],
			},
			{
				word: 'Printer',
				hints: ['Paper', 'Ink', 'Copy', 'Output', 'Machine'],
			},
			{
				word: 'Scanner',
				hints: ['Copy', 'Digital', 'Document', 'Image', 'Machine'],
			},
			{
				word: 'Calculator',
				hints: ['Math', 'Numbers', 'Sum', 'Buttons', 'Device'],
			},
			{
				word: 'Whiteboard',
				hints: ['Marker', 'Classroom', 'Write', 'Erase', 'Wall'],
			},
			{
				word: 'Marker',
				hints: ['Ink', 'Whiteboard', 'Write', 'Color', 'Cap'],
			},
			{
				word: 'Chalk',
				hints: ['Blackboard', 'Write', 'White dust', 'School', 'Stick'],
			},
			{
				word: 'Blackboard',
				hints: ['Chalk', 'School', 'Classroom', 'Green', 'Wall'],
			},
			{
				word: 'Backpack',
				hints: ['Bag', 'School', 'Books', 'Shoulders', 'Carry'],
			},
			{
				word: 'Glue',
				hints: ['Stick', 'Paste', 'Adhesive', 'Paper', 'Bottle'],
			},
			{
				word: 'Scissors',
				hints: ['Cut', 'Paper', 'Sharp', 'Blades', 'Tools'],
			},
			{
				word: 'Stapler',
				hints: ['Bind', 'Paper', 'Metal clip', 'Fasten', 'Desk'],
			},
			{
				word: 'Paperclip',
				hints: ['Hold', 'Paper', 'Metal loop', 'Desk', 'Wire'],
			},
			{
				word: 'Folder',
				hints: ['File', 'Paper', 'Organize', 'Document', 'Storage'],
			},
			{
				word: 'Binder',
				hints: ['Rings', 'Paper', 'File', 'Folder', 'Organize'],
			},
			{
				word: 'Calendar',
				hints: ['Dates', 'Months', 'Days', 'Year', 'Wall'],
			},
			{
				word: 'Clock',
				hints: ['Time', 'Hands', 'Wall', 'Tick', 'Hours'],
			},
			{
				word: 'Telephone',
				hints: ['Call', 'Ring', 'Desk', 'Office', 'Voice'],
			},
			{
				word: 'Envelope',
				hints: ['Mail', 'Letter', 'Paper pocket', 'Stamp', 'Seal'],
			},
			{
				word: 'Stamp',
				hints: ['Mail', 'Letter', 'Envelope', 'Postage', 'Sticker'],
			},
			{
				word: 'Projector',
				hints: ['Screen', 'Light', 'Movie', 'Presentation', 'Wall'],
			},
			{
				word: 'Globe',
				hints: ['Earth', 'Map', 'Ball', 'World', 'Sphere'],
			},
			{
				word: 'Dictionary',
				hints: [
					'Words',
					'Definitions',
					'Book',
					'Alphabetical',
					'Language',
				],
			},
			{
				word: 'Highlighter',
				hints: ['Fluorescent', 'Marker', 'Text', 'Yellow', 'Bright'],
			},
			{
				word: 'Compass',
				hints: ['Circle', 'Math', 'Drawing', 'Point', 'Geometry'],
			},
			{
				word: 'Protractor',
				hints: ['Angles', 'Math', 'Degrees', 'Semi-circle', 'Geometry'],
			},
			{
				word: 'Tape',
				hints: ['Sticky', 'Roll', 'Adhesive', 'Clear', 'Dispenser'],
			},
			{
				word: 'Desk Organizer',
				hints: ['Pens', 'Holder', 'Desk', 'Tidy', 'Cup'],
			},
			{
				word: 'Cabinet',
				hints: ['Files', 'Drawers', 'Storage', 'Metal', 'Lock'],
			},
			{
				word: 'Sticky Notes',
				hints: ['Post-it', 'Yellow', 'Remind', 'Paper', 'Pad'],
			},
			{
				word: 'Sharpener',
				hints: ['Pencil', 'Shave', 'Blade', 'Point', 'Wood'],
			},
			{
				word: 'Inkpot',
				hints: ['Pen', 'Liquid', 'Ink', 'Refill', 'Well'],
			},
			{
				word: 'Clipboard',
				hints: ['Write', 'Paper', 'Clip', 'Board', 'Handheld'],
			},
			{ word: 'Badge', hints: ['Name', 'ID', 'Pin', 'Card', 'Uniform'] },
			{
				word: 'Laminator',
				hints: ['Plastic', 'Coat', 'Protect', 'Paper', 'Heat'],
			},
			{
				word: 'Diary',
				hints: ['Journal', 'Write', 'Daily', 'Book', 'Secret'],
			},
			{
				word: 'Textbook',
				hints: ['School', 'Study', 'Subject', 'Book', 'Class'],
			},
			{
				word: 'Report Card',
				hints: ['Grades', 'School', 'Student', 'Marks', 'Paper'],
			},
			{
				word: 'Diploma',
				hints: [
					'Graduate',
					'Degree',
					'University',
					'Certificate',
					'Paper',
				],
			},
		],
	},
	{
		label: 'Nature & Weather',
		value: 'nature_weather',
		entries: [
			{ word: 'Sun', hints: ['Star', 'Hot', 'Sky', 'Light', 'Day'] },
			{
				word: 'Moon',
				hints: ['Night', 'Sky', 'Orbit', 'Orbit', 'Craters'],
			},
			{
				word: 'Star',
				hints: ['Night', 'Sky', 'Twinkle', 'Space', 'Bright'],
			},
			{
				word: 'Cloud',
				hints: ['Sky', 'White', 'Rain', 'Water vapor', 'Fluffy'],
			},
			{ word: 'Rain', hints: ['Water', 'Sky', 'Cloud', 'Wet', 'Storm'] },
			{
				word: 'Snow',
				hints: ['Cold', 'White', 'Winter', 'Ice', 'Flake'],
			},
			{
				word: 'Wind',
				hints: ['Air', 'Blow', 'Breeze', 'Storm', 'Invisible'],
			},
			{
				word: 'Storm',
				hints: ['Thunder', 'Lightning', 'Rain', 'Dark sky', 'Wind'],
			},
			{
				word: 'Thunder',
				hints: ['Sound', 'Storm', 'Lightning', 'Loud', 'Sky'],
			},
			{
				word: 'Lightning',
				hints: ['Flash', 'Electricity', 'Storm', 'Bright', 'Sky'],
			},
			{
				word: 'Rainbow',
				hints: ['Colors', 'Sky', 'Rain', 'Sun', 'Arch'],
			},
			{
				word: 'Fog',
				hints: ['Mist', 'Cloud', 'Ground', 'Low vision', 'Thick'],
			},
			{
				word: 'Tornado',
				hints: ['Twister', 'Wind', 'Spin', 'Funnel', 'Storm'],
			},
			{
				word: 'Hurricane',
				hints: ['Storm', 'Wind', 'Ocean', 'Cyclone', 'Huge'],
			},
			{
				word: 'Mountain',
				hints: ['Peak', 'High', 'Rock', 'Climb', 'Alps'],
			},
			{
				word: 'Hill',
				hints: ['Mound', 'Slope', 'Green', 'Climb', 'Small mountain'],
			},
			{
				word: 'Valley',
				hints: ['Low land', 'Mountains', 'Green', 'River', 'Flat'],
			},
			{
				word: 'River',
				hints: ['Water', 'Flow', 'Stream', 'Ocean', 'Bank'],
			},
			{
				word: 'Lake',
				hints: ['Water', 'Body', 'Landlocked', 'Pond', 'Freshwater'],
			},
			{
				word: 'Ocean',
				hints: ['Sea', 'Saltwater', 'Huge', 'Waves', 'Deep'],
			},
			{
				word: 'Sea',
				hints: ['Ocean', 'Saltwater', 'Beach', 'Waves', 'Coast'],
			},
			{ word: 'Beach', hints: ['Sand', 'Ocean', 'Sea', 'Sun', 'Waves'] },
			{
				word: 'Desert',
				hints: ['Sand', 'Hot', 'Cactus', 'Dry', 'Sahara'],
			},
			{
				word: 'Forest',
				hints: ['Trees', 'Woods', 'Green', 'Animals', 'Jungle'],
			},
			{
				word: 'Jungle',
				hints: ['Rainforest', 'Trees', 'Tropical', 'Wild', 'Green'],
			},
			{
				word: 'Island',
				hints: ['Water', 'Surrounded', 'Beach', 'Land', 'Ocean'],
			},
			{
				word: 'Volcano',
				hints: ['Lava', 'Erupt', 'Mountain', 'Magma', 'Smoke'],
			},
			{
				word: 'Cave',
				hints: ['Underground', 'Rock', 'Dark', 'Bats', 'Stone'],
			},
			{
				word: 'Waterfall',
				hints: ['Water', 'Drop', 'River', 'Cliff', 'Cascade'],
			},
			{
				word: 'Tree',
				hints: ['Trunk', 'Leaves', 'Wood', 'Forest', 'Branch'],
			},
			{
				word: 'Flower',
				hints: ['Petals', 'Bloom', 'Plant', 'Smell', 'Rose'],
			},
			{
				word: 'Grass',
				hints: ['Green', 'Ground', 'Lawn', 'Field', 'Mow'],
			},
			{
				word: 'Plant',
				hints: ['Green', 'Grow', 'Leaf', 'Soil', 'Garden'],
			},
			{
				word: 'Leaf',
				hints: ['Tree', 'Green', 'Fall', 'Branch', 'Plant'],
			},
			{
				word: 'Root',
				hints: ['Underground', 'Tree', 'Plant', 'Soil', 'Water'],
			},
			{
				word: 'Seed',
				hints: ['Plant', 'Grow', 'Soil', 'Small', 'Fruit'],
			},
			{
				word: 'Soil',
				hints: ['Dirt', 'Earth', 'Ground', 'Plant', 'Brown'],
			},
			{
				word: 'Rock',
				hints: ['Stone', 'Hard', 'Mountain', 'Ground', 'Mineral'],
			},
			{
				word: 'Sand',
				hints: ['Beach', 'Desert', 'Tiny grains', 'Yellow', 'Shore'],
			},
			{
				word: 'Ice',
				hints: ['Frozen', 'Water', 'Cold', 'Slip', 'Solid'],
			},
			{ word: 'Fire', hints: ['Hot', 'Flame', 'Burn', 'Smoke', 'Wood'] },
			{ word: 'Smoke', hints: ['Fire', 'Gray', 'Air', 'Burn', 'Cloud'] },
			{
				word: 'Earthquake',
				hints: ['Shake', 'Ground', 'Fault line', 'Tremor', 'Quake'],
			},
			{
				word: 'Avalanche',
				hints: ['Snow', 'Slide', 'Mountain', 'Collapse', 'Winter'],
			},
			{
				word: 'Flood',
				hints: ['Water', 'Overflow', 'Rain', 'Submerged', 'Disaster'],
			},
			{
				word: 'Drought',
				hints: [
					'Dry',
					'No rain',
					'Water shortage',
					'Desert-like',
					'Heat',
				],
			},
			{
				word: 'Wave',
				hints: ['Ocean', 'Water', 'Beach', 'Surf', 'Crest'],
			},
			{
				word: 'Cactus',
				hints: ['Desert', 'Spikes', 'Green', 'Plant', 'Dry'],
			},
			{
				word: 'Coral',
				hints: ['Reef', 'Ocean', 'Sea life', 'Colorful', 'Underwater'],
			},
			{
				word: 'Glacier',
				hints: ['Ice', 'Huge', 'Mountain', 'Frozen river', 'Cold'],
			},
		],
	},
];

function pickRandomWord(selectedCategories) {
	const pool = CATEGORIES.filter((c) => selectedCategories.includes(c.value));
	if (pool.length === 0) return null;

	const category = pool[Math.floor(Math.random() * pool.length)];

	if (!category.entries || category.entries.length === 0) return null;
	const entry =
		category.entries[Math.floor(Math.random() * category.entries.length)];

	if (
		!entry.hints ||
		!Array.isArray(entry.hints) ||
		entry.hints.length === 0
	) {
		return {
			word: entry.word,
			hint: 'Generic Hint',
			category: category.label,
		};
	}

	const randomHintIndex = Math.floor(Math.random() * entry.hints.length);

	return {
		word: entry.word,
		hint: entry.hints[randomHintIndex],
		category: category.label,
	};
}

export { CATEGORIES, pickRandomWord };
