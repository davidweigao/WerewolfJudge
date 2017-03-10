from flask import Flask
from flask_socketio import SocketIO, send, emit, join_room
from flask import request
from multiprocessing import Process
from random import randrange

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
username = ""
room_id = 0
characters = []
players = []
judge = 0

class Player:
	def __init__(self, sid, room_id):
		self.room_id = room_id
		self.sid = sid
		self.character = 'none'
		self.number = 0
		self.isAlive = True

	def draw_character(self,characters, numbers, judge):
		index = randrange(0, len(characters))
		character = characters[index]
		del characters[index]
		if character == 'seer':
			self.character = Seer(self)

		elif character == 'witch':
			self.character = Witch(self)
		elif character == 'hunter':
			self.character = Hunter(self)
		elif character == 'idiot':
			self.character = Idiot(self)
		elif character == 'werewolf':
			self.character = Werewolf(self)
		elif character == 'villager':
			self.character = Villager(self)


		number_index = randrange(0, len(numbers))
		self.number = numbers[number_index]
		del numbers[number_index]

	def is_werewolf():
		return isinstance(self.character, 'Werewolf')


class Idiot:
	def __init__(self, player):
		self.player = player

class Werewolf:
	def __init__(self, player):
		self.player = player

class Hunter:
	def __init__(self, player):
		self.player = player

class Villager:
	def __init__(self, player):
		self.player = player

class Witch:
	def __init__(self, player):
		self.antidote = 1
		self.poison = 1
		self.player = player

	def inform_victim(number):
		socketio.emit('inform_victim_to_witch', number, room=player.sid)

	def antidote_used()：
		self.antidote = 0

	def poison_used():
		self.poison = 0

class Seer:
	def __init__(self, player):
		self.player = player

	def inform_prophey(number, is_good):
		socketio.emit('inform_seer_prophey', (number, is_good), room=player.sid)

class Judge:
	def __init__(self, room_id, players):
		self.room_id = room_id
		allplayers = [seer, witch, hunter, idiot] + villagers + werewolfs
		self.number_to_player = {}
		for player in allplayers:
			self.number_to_player[player.number] = player


	def setCharacters(seer, witch, hunter, idiot, villagers, werewolfs):
		self.seer = seer
		self.witch = witch
		self.hunter = hunter
		self.idiot = idiot
		self.werewolfs = werewolfs
		self.villagers = villagers


	def setVictim(number):
		self.lastVictim = number

	def setPoisoned(number):
		self.poisoned = number

	def broadcast(announcement):
		socketio.emit(announcement, room = self.room_id)

	def inform_seer(player_number, is_good):
		socketio.emit('prophecy', (player_number, is_good), room = self.seer.sid)

	def inform_hunter(can_shoot):
		socketio.emit('inform_hunter', can_shoot, room = self.hunter.sid)

	def inform_witch(victim_number):
		socketio.emit('inform_witch', victim_number, room = self.hunter.sid)


def shutdown_server():
	func = request.environ.get('werkzeug.server.shutdown')
	if func is None:
		raise RuntimeError('Not runnign with the Werkzeug Server')
	func()

def run_server():
	socketio.run(app, debug=True)

@app.route('/ping', methods=['GET'])
def ping():
	print username
	socketio.emit('message','ping', room=username)

@app.route("/")
def hello():
	return "Hello World!"

@app.route('/shutdown', methods=['GET'])
def shutdown():
	shutdown_server()
	return 'Server shutting down...'

# unnamed string request
@socketio.on('message')
def handle_message(message):
	global username
	username = request.sid
	print('received message: ' + message)
	if message == 'ping':
		send('pong')
	return "response from flask"

@socketio.on('json')
def handle_json(json):
	print('received json: ' + str(json))

@socketio.on('create_game')
def handle_start_game(json):
	global room_id
	global players
	room_id = randrange(100, 1000)
	join_room(room_id)
	players = []
	players.append(Player(request.sid, room_id))
	character_dict = json['characters']
	werewolf_amount = character_dict['werewolf']
	villager_amount = character_dict['villager']
	seer = character_dict['seer'] if 'seer' in character_dict else 0
	witch = character_dict['witch'] if 'witch' in character_dict else 0
	hunter = character_dict['hunter'] if 'hunter' in character_dict else 0
	idiot = character_dict['idiot'] if 'idiot' in character_dict else 0
	global characters
	characters = []
	for _ in range(werewolf_amount): characters.append('werewolf')
	for _ in range(villager_amount): characters.append('villager')
	for _ in range(seer): characters.append('seer')
	for _ in range(witch): characters.append('witch')
	for _ in range(hunter): characters.append('hunter')
	for _ in range(idiot): characters.append('idiot')
	return room_id

@socketio.on('join_game')
def handle_join_game(room_id_to_join):
	players.append(Player(request.sid, room_id))
	join_room(room_id)
	return 'wait'

@socketio.on('start_game')
def handle_start_game():
	if len(players) == len(characters) and len(characters) > 0:
		numbers = range(1, len(characters) + 1)
		for player in players:
			player.draw_character(characters, numbers)
		global judge
		judge = Judge(room_id, players)
		judge.boradcast('game_begin')
	else:
		return 'error'

@socketio.on('werewolf_response')
def on_werewolf_response(player_number):
	judge.broadcast('witch_open_eye')
	judge.inform_witch()
	#TODO
	
@socketio.on('witch_response')
def on_witch_response()：
	judge.broadcast('witch_close_eye')
	# delay
	judge.broadcast('seer_open_eye')

@socketio.on('seer_response')
def on_seer_response(player_number):
	judge.inform_seer(player_number, players[player_number].is_werewolf()) #TODO this is not working
	# TODO delay
	judge.broadcast('seer_close_eye')
	# TODO delay
	judge.broadcast('hunter_open_eye')
	# TODO delay
	judge.inform_hunter(True) # TODO not working
	# TODO delay
	judge.broadcast('night_end')

@socketio.on('connect')
def on_connect():
	print 'connected'

@socketio.on('disconnect')
def on_disconnect():
	print 'disconnect'

# def my_handler(data):
# 	print("this is called, with data" + str(data))

# socketio.on_event('gaowei1', my_handler)

if __name__ == "__main__":
	run_server()