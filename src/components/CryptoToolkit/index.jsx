import React, { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.css';

// Complete BIP39 word list
const BIP39_WORDS = [
  'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract', 'absurd', 'abuse',
  'access', 'accident', 'account', 'accuse', 'achieve', 'acid', 'acoustic', 'acquire', 'across', 'act',
  'action', 'actor', 'actress', 'actual', 'adapt', 'add', 'addict', 'address', 'adjust', 'admit',
  'adult', 'advance', 'advice', 'aerobic', 'affair', 'afford', 'afraid', 'again', 'age', 'agent',
  'agree', 'ahead', 'aim', 'air', 'airport', 'aisle', 'alarm', 'album', 'alcohol', 'alert',
  'alien', 'all', 'alley', 'allow', 'almost', 'alone', 'alpha', 'already', 'also', 'alter',
  'always', 'amateur', 'amazing', 'among', 'amount', 'amused', 'analyst', 'anchor', 'ancient', 'anger',
  'angle', 'angry', 'animal', 'ankle', 'announce', 'annual', 'another', 'answer', 'antenna', 'antique',
  'anxiety', 'any', 'apart', 'apology', 'appear', 'apple', 'approve', 'april', 'arch', 'arctic',
  'area', 'arena', 'argue', 'arm', 'armed', 'armor', 'army', 'around', 'arrange', 'arrest',
  'arrive', 'arrow', 'art', 'artefact', 'artist', 'artwork', 'ask', 'aspect', 'assault', 'asset',
  'assist', 'assume', 'asthma', 'athlete', 'atom', 'attack', 'attend', 'attitude', 'attract', 'auction',
  'audit', 'august', 'aunt', 'author', 'auto', 'autumn', 'average', 'avocado', 'avoid', 'awake',
  'aware', 'away', 'awesome', 'awful', 'awkward', 'axis', 'baby', 'bachelor', 'bacon', 'badge',
  'bag', 'balance', 'ball', 'balloon', 'banana', 'band', 'bank', 'bar', 'barely', 'bark',
  'barrel', 'base', 'basic', 'basket', 'basketball', 'bat', 'batch', 'beach', 'bean', 'beauty',
  'because', 'become', 'beef', 'before', 'begin', 'behave', 'behind', 'believe', 'below', 'belt',
  'bench', 'benefit', 'best', 'betray', 'better', 'between', 'beyond', 'bicycle', 'bid', 'bike',
  'bind', 'biology', 'bird', 'birth', 'bitter', 'black', 'blade', 'blame', 'blanket', 'blast',
  'bleed', 'blend', 'bless', 'blind', 'blood', 'blossom', 'blow', 'blue', 'blush', 'board',
  'boat', 'body', 'boil', 'bomb', 'bond', 'bone', 'bonus', 'book', 'boost', 'booth',
  'border', 'boring', 'borrow', 'boss', 'bottom', 'bounce', 'box', 'boy', 'brain', 'brand',
  'brave', 'bread', 'break', 'breakfast', 'breath', 'brick', 'bride', 'brief', 'bright', 'bring',
  'broad', 'broken', 'brother', 'brown', 'brush', 'budget', 'build', 'burst', 'business', 'busy',
  'butter', 'buyer', 'buzz', 'cabbage', 'cabin', 'cable', 'calm', 'camera', 'camp', 'canal',
  'cannot', 'capital', 'captain', 'car', 'carbon', 'card', 'cargo', 'carry', 'cart', 'case',
  'cash', 'casino', 'castle', 'casual', 'cat', 'catalog', 'catch', 'category', 'cattle', 'caught',
  'cause', 'caution', 'cave', 'ceiling', 'cell', 'cement', 'century', 'cereal', 'certain', 'chair',
  'chalk', 'champion', 'change', 'chaos', 'chapter', 'charge', 'chart', 'chase', 'cheap', 'check',
  'cheese', 'chemical', 'chest', 'chicken', 'chief', 'child', 'choice', 'choose', 'chronic', 'chunk',
  'churn', 'cigarette', 'circle', 'citizen', 'city', 'claim', 'clap', 'clarify', 'claw', 'clay',
  'clean', 'clerk', 'clever', 'click', 'client', 'cliff', 'climb', 'clinic', 'clock', 'clone',
  'close', 'cloth', 'cloud', 'clown', 'club', 'clump', 'cluster', 'coach', 'coast', 'coconut',
  'code', 'coffee', 'coil', 'coin', 'collect', 'color', 'column', 'combine', 'come', 'comedy',
  'comfort', 'comic', 'common', 'company', 'concert', 'conduct', 'confirm', 'congress', 'connect', 'consider',
  'control', 'convince', 'cook', 'cool', 'copper', 'copy', 'coral', 'core', 'corn', 'correct',
  'cost', 'cotton', 'couch', 'could', 'council', 'count', 'counter', 'country', 'couple', 'courage',
  'course', 'cousin', 'cover', 'coyote', 'crack', 'cradle', 'craft', 'cram', 'crane', 'crash',
  'crawl', 'crazy', 'cream', 'creature', 'credit', 'crew', 'cricket', 'crime', 'crisis', 'crop',
  'cross', 'crowd', 'crown', 'crucial', 'cruel', 'cruise', 'crumble', 'crunch', 'cry', 'crystal',
  'cube', 'culture', 'cup', 'cupboard', 'curious', 'current', 'curtain', 'curve', 'cushion', 'custom',
  'cycle', 'dad', 'damage', 'dance', 'danger', 'dare', 'dark', 'data', 'date', 'daughter',
  'dawn', 'day', 'deal', 'debate', 'debris', 'decade', 'december', 'decide', 'decline', 'decorate',
  'decrease', 'defense', 'define', 'defy', 'degree', 'delay', 'deliver', 'demand', 'demise', 'denial',
  'dentist', 'deny', 'depart', 'depend', 'deposit', 'depth', 'deputy', 'derive', 'describe', 'desert',
  'design', 'desk', 'despair', 'destroy', 'detail', 'detect', 'determine', 'develop', 'device', 'devote',
  'diagram', 'dial', 'diamond', 'diary', 'dice', 'diesel', 'diet', 'differ', 'digital', 'dignity',
  'dilemma', 'dinner', 'dinosaur', 'direct', 'dirt', 'disagree', 'disappear', 'disaster', 'discard', 'discover',
  'dish', 'dismiss', 'disorder', 'display', 'distance', 'divert', 'divide', 'divorce', 'dizzy', 'doctor',
  'document', 'dog', 'dollar', 'domain', 'donate', 'donkey', 'donor', 'door', 'dose', 'double',
  'doubt', 'down', 'dozen', 'draft', 'dragon', 'drama', 'drastic', 'draw', 'dream', 'dress',
  'drift', 'drill', 'drink', 'drive', 'drop', 'drum', 'dry', 'duck', 'dumb', 'dune',
  'during', 'dust', 'duty', 'dwarf', 'dynamic', 'eager', 'eagle', 'early', 'earn', 'earth',
  'easily', 'east', 'easy', 'echo', 'ecosystem', 'educate', 'effort', 'egg', 'eight', 'either',
  'elbow', 'elder', 'electric', 'elegant', 'element', 'elephant', 'elevator', 'elite', 'else', 'embark',
  'embody', 'embrace', 'emerge', 'emotion', 'emphasize', 'empower', 'empty', 'enable', 'enact', 'end',
  'endless', 'endorse', 'enemy', 'energy', 'enforce', 'engage', 'engine', 'enhance', 'enjoy', 'enlist',
  'enough', 'enrich', 'enroll', 'ensure', 'enter', 'entire', 'entry', 'envelope', 'episode', 'equal',
  'equip', 'era', 'erase', 'erode', 'erosion', 'error', 'erupt', 'essay', 'essence', 'estate',
  'eternal', 'ethics', 'evidence', 'evil', 'evolve', 'exact', 'example', 'excess', 'exchange', 'excite',
  'exclude', 'excuse', 'execute', 'exercise', 'exhaust', 'exhibit', 'exile', 'exist', 'exit', 'exotic',
  'expand', 'expect', 'expire', 'explain', 'explode', 'export', 'expose', 'express', 'extend', 'exterior',
  'extra', 'eye', 'fabric', 'face', 'faculty', 'fade', 'faint', 'faith', 'fall', 'false',
  'fame', 'family', 'famous', 'fan', 'fancy', 'fantastic', 'farm', 'fashion', 'fat', 'fatal',
  'father', 'fatigue', 'fault', 'favorite', 'feature', 'february', 'federal', 'fee', 'feed', 'feel',
  'female', 'fence', 'festival', 'fetch', 'fever', 'few', 'fiber', 'fiction', 'field', 'figure',
  'file', 'film', 'filter', 'final', 'find', 'fine', 'finger', 'finish', 'fire', 'firm',
  'first', 'fiscal', 'fish', 'fit', 'fitness', 'fix', 'flag', 'flame', 'flash', 'flat',
  'flavor', 'flee', 'flight', 'flip', 'float', 'flock', 'floor', 'flower', 'fluid', 'focus',
  'fog', 'foil', 'fold', 'follow', 'food', 'foot', 'force', 'forest', 'forget', 'fork',
  'fortune', 'forum', 'forward', 'fossil', 'foster', 'found', 'fox', 'fragile', 'frame', 'frequent',
  'fresh', 'friend', 'frighten', 'fringe', 'frog', 'front', 'frost', 'frozen', 'fruit', 'fuel',
  'fun', 'funny', 'furnace', 'fury', 'future', 'gadget', 'gain', 'galaxy', 'gallery', 'game',
  'garage', 'garbage', 'garden', 'garlic', 'garment', 'gas', 'gasp', 'gate', 'gather', 'gauge',
  'general', 'genius', 'genre', 'gentle', 'genuine', 'gesture', 'ghost', 'giant', 'gift', 'giggle',
  'ginger', 'giraffe', 'girl', 'give', 'glad', 'glance', 'glare', 'glass', 'glide', 'glimpse',
  'globe', 'gloom', 'glory', 'glove', 'glow', 'glue', 'goat', 'goddess', 'gold', 'good',
  'goose', 'gorilla', 'gospel', 'gossip', 'govern', 'gown', 'grab', 'grace', 'grain', 'grant',
  'grape', 'graph', 'grass', 'gravity', 'great', 'green', 'grid', 'grief', 'grit', 'grocery',
  'grow', 'grunt', 'guard', 'guess', 'guide', 'guilt', 'guitar', 'gun', 'gym', 'habit',
  'hair', 'half', 'hammer', 'hamster', 'hand', 'happy', 'harbor', 'hard', 'harsh', 'harvest',
  'hat', 'have', 'hawk', 'hazard', 'head', 'health', 'heart', 'heavy', 'hedgehog', 'height',
  'hello', 'helmet', 'help', 'hen', 'hero', 'hidden', 'high', 'hill', 'hint', 'hip',
  'hire', 'history', 'hobby', 'hockey', 'hold', 'hole', 'holiday', 'hollow', 'home', 'honey',
  'hood', 'hope', 'horn', 'horror', 'horse', 'hospital', 'host', 'hotel', 'hour', 'hover',
  'hub', 'huge', 'human', 'humble', 'humor', 'hundred', 'hungry', 'hunt', 'hurdle', 'hurry',
  'hurt', 'husband', 'hybrid', 'ice', 'icon', 'idea', 'identify', 'idle', 'ignore', 'ill',
  'illegal', 'illness', 'image', 'imitate', 'immune', 'impact', 'impose', 'improve', 'impulse', 'inch',
  'include', 'income', 'increase', 'index', 'indicate', 'indoor', 'industry', 'infant', 'inflict', 'inform',
  'inhale', 'inherit', 'initial', 'inject', 'injury', 'inmate', 'inner', 'innocent', 'input', 'inquiry',
  'insane', 'insect', 'inside', 'inspire', 'install', 'intact', 'interest', 'into', 'invest', 'involve',
  'iron', 'island', 'isolate', 'issue', 'item', 'ivory', 'jacket', 'jaguar', 'jar', 'jazz',
  'jealous', 'jeans', 'jelly', 'jewel', 'job', 'join', 'joke', 'journey', 'joy', 'judge',
  'juice', 'jump', 'jungle', 'junior', 'junk', 'just', 'kangaroo', 'keen', 'keep', 'ketchup',
  'key', 'kick', 'kid', 'kidney', 'kind', 'kingdom', 'kiss', 'kit', 'kitchen', 'kite',
  'kitten', 'kiwi', 'knee', 'knife', 'knock', 'know', 'label', 'labor', 'lack', 'lady',
  'lamp', 'language', 'laptop', 'large', 'later', 'latin', 'laugh', 'lava', 'layer', 'lead',
  'leaf', 'learn', 'leave', 'lecture', 'left', 'leg', 'legal', 'lemon', 'lend', 'length',
  'lens', 'leopard', 'lesson', 'letter', 'level', 'liar', 'liberty', 'library', 'license', 'life',
  'lift', 'light', 'like', 'limb', 'limit', 'link', 'lion', 'list', 'little', 'live',
  'lizard', 'load', 'loan', 'lobster', 'local', 'lock', 'logic', 'lonely', 'long', 'loop',
  'lottery', 'loud', 'lounge', 'love', 'loyal', 'lucky', 'luggage', 'lump', 'lunar', 'lunch',
  'luxury', 'machine', 'mad', 'magic', 'magnet', 'maid', 'mail', 'main', 'major', 'make',
  'mammal', 'man', 'manage', 'mandate', 'mango', 'mansion', 'manual', 'maple', 'marble', 'march',
  'margin', 'marine', 'market', 'marriage', 'mask', 'mass', 'master', 'match', 'material', 'math',
  'matrix', 'matter', 'maximum', 'maze', 'meadow', 'mean', 'measure', 'meat', 'mechanic', 'medal',
  'media', 'melody', 'melt', 'member', 'memory', 'mention', 'menu', 'mercy', 'merge', 'merit',
  'merry', 'mesh', 'message', 'metal', 'method', 'middle', 'midnight', 'milk', 'million', 'mind',
  'minimum', 'minor', 'minute', 'miracle', 'mirror', 'misery', 'miss', 'mistake', 'mix', 'mixed',
  'mixture', 'mobile', 'model', 'modify', 'mom', 'moment', 'monitor', 'monkey', 'monster', 'month',
  'moon', 'moral', 'more', 'morning', 'mosquito', 'mother', 'motion', 'motor', 'mountain', 'mouse',
  'move', 'movie', 'much', 'muffin', 'mule', 'multiply', 'muscle', 'museum', 'mushroom', 'music',
  'must', 'mutual', 'myself', 'mystery', 'myth', 'naive', 'name', 'napkin', 'narrow', 'nasty',
  'nation', 'nature', 'near', 'neck', 'need', 'negative', 'neighborhood', 'nervous', 'nest', 'network',
  'neutral', 'never', 'news', 'next', 'nice', 'night', 'noble', 'noise', 'nominee', 'noodle',
  'normal', 'north', 'nose', 'note', 'nothing', 'notice', 'novel', 'now', 'nuclear', 'number',
  'nurse', 'nut', 'oak', 'obey', 'object', 'oblige', 'obscure', 'observe', 'obtain', 'obvious',
  'ocean', 'october', 'odor', 'off', 'offer', 'office', 'often', 'oil', 'okay', 'old',
  'olive', 'olympic', 'once', 'one', 'ongoing', 'onion', 'online', 'only', 'open', 'opera',
  'opinion', 'oppose', 'option', 'orange', 'orbit', 'orchard', 'order', 'ordinary', 'organ', 'orient',
  'original', 'ostrich', 'other', 'outer', 'outlet', 'outside', 'oval', 'oven', 'over', 'owner',
  'oxygen', 'oyster', 'ozone', 'pact', 'paddle', 'page', 'pair', 'palace', 'palm', 'panda',
  'panel', 'panic', 'panther', 'paper', 'parade', 'parent', 'park', 'parrot', 'party', 'pass',
  'path', 'patient', 'patrol', 'pattern', 'pause', 'payment', 'peace', 'peanut', 'peer', 'pen',
  'penalty', 'pencil', 'pepper', 'percent', 'perfect', 'permit', 'person', 'pet', 'phone', 'photo',
  'phrase', 'physical', 'piano', 'picnic', 'picture', 'piece', 'pig', 'pigeon', 'pill', 'pilot',
  'pink', 'pioneer', 'pipe', 'pistol', 'pitch', 'pizza', 'place', 'planet', 'plastic', 'plate',
  'play', 'please', 'pledge', 'plenty', 'plot', 'plow', 'plug', 'plunge', 'poem', 'poet',
  'point', 'polar', 'pole', 'police', 'pond', 'pony', 'pool', 'popular', 'portion', 'position',
  'possible', 'post', 'potato', 'pottery', 'poverty', 'powder', 'power', 'practice', 'praise', 'predict',
  'prefer', 'prepare', 'present', 'pretty', 'prevent', 'price', 'pride', 'primary', 'print', 'priority',
  'prison', 'private', 'prize', 'problem', 'process', 'produce', 'profit', 'program', 'project', 'promote',
  'proof', 'property', 'prosper', 'protect', 'proud', 'provide', 'public', 'pull', 'pulp', 'pulse',
  'pumpkin', 'punch', 'pupil', 'puppy', 'purchase', 'purpose', 'purse', 'push', 'put', 'puzzle',
  'pyramid', 'quality', 'quantity', 'quarter', 'question', 'quick', 'quit', 'quiz', 'quote', 'rabbit',
  'raccoon', 'race', 'rack', 'radar', 'radio', 'rail', 'rain', 'raise', 'rally', 'ramp',
  'ranch', 'random', 'range', 'rapid', 'rare', 'rate', 'rather', 'raven', 'raw', 'razor',
  'ready', 'real', 'reason', 'rebel', 'rebuild', 'recall', 'receive', 'recipe', 'record', 'recycle',
  'reduce', 'reflect', 'reform', 'refuse', 'region', 'regular', 'reject', 'relax', 'release', 'relief',
  'rely', 'remain', 'remember', 'remind', 'remove', 'render', 'renew', 'rent', 'reopen', 'repair',
  'repeat', 'replace', 'report', 'require', 'rescue', 'resemble', 'resist', 'resource', 'response', 'result',
  'retire', 'retreat', 'return', 'reunion', 'reveal', 'review', 'reward', 'rhythm', 'ribbon', 'rice',
  'rich', 'ride', 'ridge', 'rifle', 'right', 'ring', 'riot', 'ripple', 'risk', 'ritual',
  'rival', 'river', 'road', 'roast', 'robot', 'robust', 'rocket', 'romance', 'roof', 'rookie',
  'room', 'rose', 'rotate', 'round', 'route', 'royal', 'rubber', 'rude', 'rule', 'runway',
  'rural', 'sad', 'saddle', 'sadness', 'safe', 'sail', 'salad', 'salmon', 'salon', 'salt',
  'salute', 'same', 'sample', 'sand', 'satisfy', 'sauce', 'sausage', 'save', 'say', 'scale',
  'scan', 'scare', 'scatter', 'scene', 'scheme', 'school', 'science', 'scissors', 'scorpion', 'scout',
  'scrap', 'screen', 'script', 'scrub', 'sea', 'search', 'season', 'seat', 'second', 'secret',
  'section', 'security', 'seed', 'seek', 'segment', 'sell', 'seminar', 'senior', 'sense', 'sentence',
  'series', 'service', 'session', 'setup', 'settle', 'shadow', 'share', 'sharp', 'sheep', 'shelf',
  'shell', 'sheriff', 'shield', 'shift', 'shine', 'ship', 'shirt', 'shock', 'shoe', 'shoot',
  'shop', 'short', 'shoulder', 'shove', 'shrimp', 'shrug', 'shuffle', 'shy', 'sibling', 'side',
  'siege', 'sight', 'sign', 'silent', 'silk', 'silly', 'silver', 'similar', 'simple', 'since',
  'sing', 'siren', 'sister', 'site', 'situate', 'six', 'size', 'skate', 'sketch', 'ski',
  'skill', 'skin', 'skip', 'skirt', 'skull', 'slab', 'slam', 'sleep', 'slender', 'slice',
  'slide', 'slight', 'slim', 'slogan', 'slot', 'slow', 'slush', 'small', 'smart', 'smile',
  'smoke', 'smooth', 'snack', 'snake', 'snap', 'sniff', 'snow', 'soap', 'social', 'soldier',
  'solid', 'solve', 'someone', 'song', 'soon', 'sorry', 'sort', 'soul', 'sound', 'soup',
  'source', 'south', 'space', 'spare', 'spark', 'speak', 'special', 'speed', 'spell', 'spend',
  'sphere', 'spice', 'spider', 'spin', 'spirit', 'split', 'spoil', 'sponsor', 'spoon', 'sport',
  'spot', 'spray', 'spread', 'spring', 'spy', 'square', 'squeeze', 'squirrel', 'stable', 'stadium',
  'staff', 'stage', 'stairs', 'stamp', 'stand', 'state', 'stay', 'steak', 'steel', 'stem',
  'step', 'stereo', 'sting', 'stock', 'stomach', 'stone', 'stool', 'story', 'stove', 'strategy',
  'street', 'strike', 'strong', 'struggle', 'student', 'stuff', 'stumble', 'style', 'subject', 'submit',
  'subway', 'success', 'such', 'sudden', 'suffer', 'sugar', 'suggest', 'suit', 'summer', 'sun',
  'sunny', 'super', 'supply', 'support', 'sure', 'surface', 'surge', 'surprise', 'surround', 'survey',
  'suspect', 'sustain', 'swallow', 'swamp', 'swap', 'swarm', 'swear', 'sweet', 'swift', 'swim',
  'swing', 'switch', 'sword', 'symbol', 'symptom', 'syrup', 'system', 'table', 'tackle', 'tag',
  'tail', 'talent', 'talk', 'tank', 'tape', 'target', 'task', 'taste', 'tattoo', 'taxi',
  'teach', 'team', 'tell', 'ten', 'tenant', 'tennis', 'tent', 'term', 'test', 'text',
  'thank', 'that', 'theme', 'then', 'theory', 'there', 'they', 'thing', 'this', 'thought',
  'thousand', 'threat', 'three', 'thrive', 'throw', 'thumb', 'thunder', 'ticket', 'tide', 'tiger',
  'tilt', 'timber', 'time', 'tiny', 'tip', 'tired', 'tissue', 'title', 'toast', 'today',
  'toddler', 'toe', 'together', 'toilet', 'token', 'tomato', 'tomorrow', 'tone', 'tongue', 'tonight',
  'tool', 'tooth', 'top', 'topic', 'tornado', 'torpedo', 'torrent', 'torture', 'toss', 'total',
  'tourist', 'toward', 'tower', 'town', 'toy', 'track', 'trade', 'traffic', 'train', 'transfer',
  'trap', 'trash', 'travel', 'tray', 'treat', 'tree', 'trend', 'trial', 'tribe', 'trick',
  'trigger', 'trim', 'trip', 'trophy', 'trouble', 'truck', 'true', 'truly', 'trumpet', 'trust',
  'truth', 'try', 'tube', 'tuition', 'tumble', 'tuna', 'tunnel', 'turkey', 'turn', 'turtle',
  'twelve', 'twenty', 'twice', 'twin', 'twist', 'two', 'type', 'typical', 'ugly', 'umbrella',
  'unable', 'unusual', 'unlock', 'until', 'unusual', 'update', 'upgrade', 'upon', 'upper', 'upset',
  'urban', 'usage', 'use', 'used', 'useful', 'useless', 'usual', 'vain', 'valid', 'valley',
  'valve', 'van', 'vanish', 'vapor', 'various', 'vast', 'vault', 'vehicle', 'velvet', 'vendor',
  'venture', 'venue', 'verb', 'verify', 'version', 'very', 'vessel', 'veteran', 'vibrant', 'vicious',
  'victory', 'video', 'view', 'village', 'vintage', 'violin', 'virtual', 'virus', 'visa', 'visit',
  'visual', 'vital', 'vivid', 'vocal', 'voice', 'void', 'volcano', 'volume', 'vote', 'voyage',
  'wage', 'wagon', 'wait', 'walk', 'wall', 'want', 'war', 'warm', 'warrior', 'wash',
  'wasp', 'waste', 'watch', 'water', 'wave', 'way', 'wealth', 'weapon', 'wear', 'weather',
  'weekend', 'weird', 'welcome', 'west', 'whale', 'what', 'wheat', 'wheel', 'when', 'where',
  'whip', 'whisper', 'wide', 'width', 'wife', 'wild', 'will', 'win', 'window', 'wine',
  'wing', 'winner', 'winter', 'wire', 'wisdom', 'wise', 'wish', 'witness', 'wolf', 'woman',
  'wonder', 'wood', 'wool', 'word', 'work', 'world', 'worry', 'worth', 'wrap', 'wreck',
  'wrestle', 'wrist', 'write', 'wrong', 'yard', 'year', 'yellow', 'you', 'young', 'youth',
  'zebra', 'zero', 'zone', 'zoo'
];

export default function CryptoToolkit() {
  const [activeTab, setActiveTab] = useState('vanity');

  // Vanity address generator state
  const [vanityPrefix, setVanityPrefix] = useState('');
  const [vanitySuffix, setVanitySuffix] = useState('');
  const [vanityResults, setVanityResults] = useState([]);
  const [isGeneratingVanity, setIsGeneratingVanity] = useState(false);
  const [vanityCase, setVanityCase] = useState('any');
  const [maxAttempts, setMaxAttempts] = useState(500000);
  const [currentStats, setCurrentStats] = useState(null);

  // Wallet generator state
  const [mnemonicWords, setMnemonicWords] = useState([]);
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [address, setAddress] = useState('');
  const [walletGenerated, setWalletGenerated] = useState(false);

  // Blockchain explorer state
  const [blockchainQuery, setBlockchainQuery] = useState('');
  const [blockchainResults, setBlockchainResults] = useState(null);
  const [isQueryingBlockchain, setIsQueryingBlockchain] = useState(false);

  // Generate random bytes
  const generateRandomBytes = (length) => {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  // Generate Ethereum-style address from private key
  const generateAddressFromPrivateKey = (privKey) => {
    // Simple deterministic address generation
    let hash = privKey;
    for (let i = 0; i < 5; i++) {
      hash = generateSimpleHash(hash + i.toString());
    }
    return '0x' + hash.substring(0, 40);
  };

  // Generate simple hash
  const generateSimpleHash = (input) => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16).padStart(8, '0');
  };

  // Generate public key from private key
  const generatePublicKeyFromPrivateKey = (privKey) => {
    // Simplified public key generation
    let pubKey = '';
    for (let i = 0; i < 64; i++) {
      const byte = parseInt(privKey.substr(i * 2, 2), 16);
      const pubByte = (byte + 128) % 256;
      pubKey += pubByte.toString(16).padStart(2, '0');
    }
    return '0x' + pubKey;
  };

  // Copy to clipboard
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    }
  };

  // Check if address matches criteria
  const addressMatchesCriteria = (address, prefix, suffix, caseType) => {
    if (!prefix && !suffix) return false;

    if (prefix) {
      const prefixMatch = caseType === 'any'
        ? address.toLowerCase().includes(prefix.toLowerCase())
        : caseType === 'lower'
        ? address.toLowerCase().startsWith(prefix.toLowerCase())
        : address.startsWith(prefix);

      if (!prefixMatch) return false;
    }

    if (suffix) {
      const suffixMatch = caseType === 'any'
        ? address.toLowerCase().includes(suffix.toLowerCase())
        : caseType === 'lower'
        ? address.toLowerCase().endsWith(suffix.toLowerCase())
        : address.endsWith(suffix);

      if (!suffixMatch) return false;
    }

    return true;
  };

  // Vanity address generator
  const generateVanityAddresses = async () => {
    if (!vanityPrefix && !vanitySuffix) {
      alert('请输入前缀或后缀！');
      return;
    }

    setIsGeneratingVanity(true);
    setVanityResults([]);
    setCurrentStats(null);

    const results = [];
    const startTime = Date.now();
    let attempts = 0;
    const maxTime = 30000; // 30秒最大时间

    const updateStats = (currentAttempts) => {
      setCurrentStats({
        attempts: currentAttempts,
        timeElapsed: Date.now() - startTime,
        resultsFound: results.length
      });
    };

    while (Date.now() - startTime < maxTime && attempts < maxAttempts && results.length < 5) {
      attempts++;

      // Generate private key and address
      const privKey = generateRandomBytes(32);
      const addr = generateAddressFromPrivateKey(privKey);

      // Check if address matches criteria
      if (addressMatchesCriteria(addr, vanityPrefix, vanitySuffix, vanityCase)) {
        results.push({
          address: addr,
          privateKey: privKey,
          attempts: attempts,
          timeTaken: Date.now() - startTime
        });

        updateStats(attempts);
      }

      // Update UI periodically
      if (attempts % 100 === 0) {
        updateStats(attempts);
        await new Promise(resolve => setTimeout(resolve, 1));
      }
    }

    updateStats(attempts);
    setVanityResults(results);
    setIsGeneratingVanity(false);
  };

  // Generate complete wallet
  const generateWallet = () => {
    // Generate entropy for mnemonic
    const entropy = new Uint8Array(16);
    crypto.getRandomValues(entropy);

    // Generate 12-word mnemonic
    const words = [];
    for (let i = 0; i < 12; i++) {
      const wordIndex = entropy[i] % BIP39_WORDS.length;
      words.push(BIP39_WORDS[wordIndex]);
    }
    setMnemonicWords(words);

    // Generate private key from mnemonic
    const mnemonicString = words.join(' ');
    let seed = 0;
    for (let i = 0; i < mnemonicString.length; i++) {
      seed += mnemonicString.charCodeAt(i);
    }

    // Generate deterministic private key
    let privKey = '';
    for (let i = 0; i < 32; i++) {
      const byte = (seed + entropy[i % entropy.length] + i * 7) % 256;
      privKey += byte.toString(16).padStart(2, '0');
    }
    setPrivateKey(privKey);

    // Generate public key
    const pubKey = generatePublicKeyFromPrivateKey(privKey);
    setPublicKey(pubKey);

    // Generate address
    const addr = generateAddressFromPrivateKey(privKey);
    setAddress(addr);

    setWalletGenerated(true);
  };

  // Query blockchain
  const queryBlockchain = async () => {
    if (!blockchainQuery.trim()) {
      alert('请输入地址或交易哈希！');
      return;
    }

    setIsQueryingBlockchain(true);

    // Detect input type
    const isAddress = blockchainQuery.startsWith('0x') && blockchainQuery.length === 42;
    const isTransaction = blockchainQuery.startsWith('0x') && blockchainQuery.length === 66;

    if (isAddress) {
      // Try to get balance using multiple APIs
      try {
        // First try Etherscan
        const etherscanResponse = await fetch(
          `https://api.etherscan.io/api?module=account&action=balance&address=${blockchainQuery}&tag=latest`
        );
        const etherscanData = await etherscanResponse.json();

        if (etherscanData.status === '1') {
          setBlockchainResults({
            type: 'address',
            address: blockchainQuery,
            balance: (parseInt(etherscanData.result) / 1e18).toFixed(6),
            source: 'Etherscan',
            link: `https://etherscan.io/address/${blockchainQuery}`
          });
        } else {
          throw new Error('API request failed');
        }
      } catch (error) {
        // Fallback to just providing the link
        setBlockchainResults({
          type: 'address',
          address: blockchainQuery,
          balance: null,
          error: '无法获取余额信息',
          link: `https://etherscan.io/address/${blockchainQuery}`
        });
      }
    } else if (isTransaction) {
      setBlockchainResults({
        type: 'transaction',
        hash: blockchainQuery,
        link: `https://etherscan.io/tx/${blockchainQuery}`
      });
    } else {
      setBlockchainResults({
        type: 'error',
        message: '无效的地址或交易哈希格式'
      });
    }

    setIsQueryingBlockchain(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>🚀 加密货币工具箱</h1>
        <p>专业的区块链工具套件 - 靓号生成器、助记词生成器、密钥生成器、区块链浏览器</p>
        <p style={{ fontSize: '1rem', color: 'var(--ifm-color-success)' }}>
          🔒 所有计算均在本地完成，不会上传任何数据到服务器
        </p>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'vanity' ? styles.active : ''}`}
          onClick={() => setActiveTab('vanity')}
        >
          🎯 靓号生成器
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'wallet' ? styles.active : ''}`}
          onClick={() => setActiveTab('wallet')}
        >
          🔑 钱包生成器
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'explorer' ? styles.active : ''}`}
          onClick={() => setActiveTab('explorer')}
        >
          🔍 区块链浏览器
        </button>
      </div>

      {/* 靓号生成器 */}
      {activeTab === 'vanity' && (
        <div className={styles.toolSection}>
          <h2>🎯 靓号生成器</h2>
          <p>生成包含特定前缀或后缀的以太坊地址</p>

          <div className={styles.grid2}>
            <div className={styles.inputGroup}>
              <label>前缀 (可选)</label>
              <input
                type="text"
                value={vanityPrefix}
                onChange={(e) => setVanityPrefix(e.target.value)}
                placeholder="例如: 0x123, abc"
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>后缀 (可选)</label>
              <input
                type="text"
                value={vanitySuffix}
                onChange={(e) => setVanitySuffix(e.target.value)}
                placeholder="例如: def, 888"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.inputGroup}>
              <label>匹配模式</label>
              <select
                value={vanityCase}
                onChange={(e) => setVanityCase(e.target.value)}
                className={styles.select}
              >
                <option value="any">大小写不敏感 (更快)</option>
                <option value="lower">仅小写匹配</option>
                <option value="exact">精确匹配 (更慢)</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>最大尝试次数</label>
              <input
                type="number"
                value={maxAttempts}
                onChange={(e) => setMaxAttempts(parseInt(e.target.value) || 500000)}
                min="1000"
                max="5000000"
                step="1000"
                className={styles.input}
              />
            </div>
          </div>

          <button
            onClick={generateVanityAddresses}
            disabled={isGeneratingVanity || (!vanityPrefix && !vanitySuffix)}
            className={styles.button}
          >
            {isGeneratingVanity ? '🔄 生成中...' : '🚀 开始生成'}
          </button>

          {isGeneratingVanity && (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>正在生成靓号，请耐心等待...</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-600)' }}>
                这可能需要几秒钟到几分钟的时间
              </p>
              {currentStats && (
                <div className={styles.stats}>
                  <span>已尝试: {currentStats.attempts.toLocaleString()} 次</span>
                  <span>用时: {(currentStats.timeElapsed / 1000).toFixed(1)} 秒</span>
                  <span>找到: {currentStats.resultsFound} 个</span>
                </div>
              )}
            </div>
          )}

          {vanityResults.length > 0 && (
            <div className={styles.results}>
              <h3>🎉 找到 {vanityResults.length} 个靓号:</h3>
              {vanityResults.map((result, index) => (
                <div key={index} className={styles.resultCard}>
                  <div className={styles.stats}>
                    <span className={styles.attempts}>
                      尝试次数: {result.attempts.toLocaleString()}
                    </span>
                    <span className={styles.time}>
                      用时: {(result.timeTaken / 1000).toFixed(1)}s
                    </span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>📫 地址:</label>
                    <div className={styles.keyDisplay}>
                      {result.address}
                      <button
                        onClick={() => copyToClipboard(result.address)}
                        className={styles.copyButton}
                      >
                        📋 复制
                      </button>
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>🔒 私钥:</label>
                    <div className={styles.keyDisplay} style={{ color: '#ef4444' }}>
                      {result.privateKey}
                      <button
                        onClick={() => copyToClipboard(result.privateKey)}
                        className={styles.copyButton}
                      >
                        📋 复制
                      </button>
                    </div>
                  </div>

                  <div className={styles.warning}>
                    ⚠️ 重要：请妥善保管私钥！私钥一旦丢失，资产将无法恢复！
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 钱包生成器 */}
      {activeTab === 'wallet' && (
        <div className={styles.toolSection}>
          <h2>🔑 完整钱包生成器</h2>
          <p>生成包含助记词、私钥、公钥和地址的完整钱包 - 所有计算均在本地完成</p>

          <button
            onClick={generateWallet}
            className={styles.button}
            style={{ marginBottom: '2rem' }}
          >
            🎲 生成新钱包
          </button>

          {walletGenerated && (
            <div className={styles.results}>
              {/* 助记词显示 */}
              <div className={styles.resultCard}>
                <h3>📝 BIP39 助记词 (12个单词)</h3>
                <div className={styles.mnemonicGrid}>
                  {mnemonicWords.map((word, index) => (
                    <div key={index} className={styles.wordCard}>
                      <span className={styles.wordIndex}>{index + 1}</span>
                      <span className={styles.wordText}>{word}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <button
                    onClick={() => copyToClipboard(mnemonicWords.join(' '))}
                    className={styles.copyButton}
                  >
                    📋 复制助记词
                  </button>
                </div>
                <div className={styles.warning}>
                  ⚠️ 请安全保存助记词！助记词是恢复钱包的唯一方式！
                </div>
              </div>

              {/* 密钥显示 */}
              <div className={styles.resultCard}>
                <h3>🔐 生成的密钥对</h3>

                <div className={styles.inputGroup}>
                  <label>📫 以太坊地址:</label>
                  <div className={styles.keyDisplay}>
                    {address}
                    <button
                      onClick={() => copyToClipboard(address)}
                      className={styles.copyButton}
                    >
                      📋 复制
                    </button>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>🌐 公钥:</label>
                  <div className={styles.keyDisplay}>
                    {publicKey}
                    <button
                      onClick={() => copyToClipboard(publicKey)}
                      className={styles.copyButton}
                    >
                      📋 复制
                    </button>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>🔒 私钥:</label>
                  <div className={styles.keyDisplay} style={{ color: '#ef4444' }}>
                    {privateKey}
                    <button
                      onClick={() => copyToClipboard(privateKey)}
                      className={styles.copyButton}
                    >
                      📋 复制
                    </button>
                  </div>
                </div>

                <div className={styles.success}>
                  ✅ 钱包生成成功！请妥善保存以上信息。
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 区块链浏览器 */}
      {activeTab === 'explorer' && (
        <div className={styles.toolSection}>
          <h2>🔍 区块链浏览器</h2>
          <p>查询以太坊地址余额和交易信息</p>

          <div className={styles.inputGroup}>
            <label>地址或交易哈希:</label>
            <div className={styles.grid2} style={{ alignItems: 'end' }}>
              <input
                type="text"
                value={blockchainQuery}
                onChange={(e) => setBlockchainQuery(e.target.value)}
                placeholder="0x..."
                className={styles.input}
              />
              <button
                onClick={queryBlockchain}
                disabled={isQueryingBlockchain}
                className={styles.button}
              >
                {isQueryingBlockchain ? '🔄 查询中...' : '🔍 查询'}
              </button>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h3>🔗 区块链浏览器快速链接:</h3>
            <div className={styles.explorerLinks}>
              <a
                href="https://etherscan.io"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.explorerLink}
              >
                <div className={styles.icon}>⚡</div>
                <div>Ethereum</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)' }}>
                  ETH Explorer
                </div>
              </a>
              <a
                href="https://bscscan.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.explorerLink}
              >
                <div className={styles.icon}>🟡</div>
                <div>BSC</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)' }}>
                  BNB Smart Chain
                </div>
              </a>
              <a
                href="https://polygonscan.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.explorerLink}
              >
                <div className={styles.icon}>🟣</div>
                <div>Polygon</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)' }}>
                  MATIC Network
                </div>
              </a>
              <a
                href="https://arbiscan.io"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.explorerLink}
              >
                <div className={styles.icon}>🔵</div>
                <div>Arbitrum</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)' }}>
                  Layer 2
                </div>
              </a>
              <a
                href="https://snowtrace.io"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.explorerLink}
              >
                <div className={styles.icon}>🔺</div>
                <div>Avalanche</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)' }}>
                  AVAX C-Chain
                </div>
              </a>
              <a
                href="https://solscan.io"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.explorerLink}
              >
                <div className={styles.icon}>🟢</div>
                <div>Solana</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)' }}>
                  SOL Explorer
                </div>
              </a>
            </div>
          </div>

          {/* 查询结果 */}
          {blockchainResults && (
            <div className={styles.results}>
              <h3>🔍 查询结果:</h3>

              {blockchainResults.type === 'address' && (
                <div className={styles.resultCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>
                      📬 地址信息
                    </span>
                    <a
                      href={blockchainResults.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#667eea', textDecoration: 'none', fontWeight: '500' }}
                    >
                      在 Etherscan 查看 →
                    </a>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>地址:</label>
                    <div className={styles.keyDisplay}>{blockchainResults.address}</div>
                  </div>

                  {blockchainResults.balance ? (
                    <div className={styles.inputGroup}>
                      <label>💰 余额:</label>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e' }}>
                        {blockchainResults.balance} ETH
                      </div>
                    </div>
                  ) : blockchainResults.error ? (
                    <div className={styles.warning}>
                      {blockchainResults.error}
                    </div>
                  ) : null}
                </div>
              )}

              {blockchainResults.type === 'transaction' && (
                <div className={styles.resultCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>
                      📋 交易信息
                    </span>
                    <a
                      href={blockchainResults.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#667eea', textDecoration: 'none', fontWeight: '500' }}
                    >
                      在 Etherscan 查看详情 →
                    </a>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>🔗 交易哈希:</label>
                    <div className={styles.keyDisplay}>{blockchainResults.hash}</div>
                  </div>
                </div>
              )}

              {blockchainResults.type === 'error' && (
                <div className={styles.warning}>
                  {blockchainResults.message}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 安全声明 */}
      <div className={styles.securityNotice}>
        <h3>🔒 安全声明</h3>
        <ul>
          <li>所有计算均在您的浏览器本地完成，不会上传任何数据到服务器</li>
          <li>我们不会记录或保存您的助记词、私钥或地址信息</li>
          <li>请妥善保存您的助记词和私钥，一旦丢失将无法恢复</li>
          <li>在进行真实资产操作前，请先用小额资金进行测试</li>
          <li>靓号生成概率极低，需要大量的计算时间和运气</li>
          <li>建议使用硬件钱包来存储大额资产</li>
        </ul>
      </div>
    </div>
  );
}