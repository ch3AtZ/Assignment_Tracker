from panda3d.core import Point3
from direct.showbase.ShowBase import ShowBase
from direct.task import Task
from math import sin, cos

class FlightGame(ShowBase):
    def __init__(self):
        ShowBase.__init__(self)
        
        # Load the airplane model
        self.plane = self.loader.loadModel("models/airplane")
        self.plane.reparentTo(self.render)
        self.plane.setScale(0.5, 0.5, 0.5)
        self.plane.setPos(0, 10, 0)
        
        # Camera setup
        self.cam.setPos(0, -20, 5)
        self.cam.lookAt(self.plane)
        
        # Movement variables
        self.pitch = 0  # Up/Down
        self.roll = 0    # Tilting
        self.yaw = 0     # Left/Right
        self.speed = 0.2
        
        # Key events
        self.accept("arrow_up", self.increase_pitch)
        self.accept("arrow_down", self.decrease_pitch)
        self.accept("arrow_left", self.turn_left)
        self.accept("arrow_right", self.turn_right)
        self.accept("space", self.shoot)
        
        # Game loop
        self.taskMgr.add(self.update, "update")
    
    def increase_pitch(self):
        self.pitch += 2
    
    def decrease_pitch(self):
        self.pitch -= 2
    
    def turn_left(self):
        self.yaw += 2
    
    def turn_right(self):
        self.yaw -= 2
    
    def shoot(self):
        print("Fire!")  # Placeholder for shooting mechanics
    
    def update(self, task):
        # Move the plane forward
        dx = self.speed * sin(self.yaw)
        dy = self.speed * cos(self.yaw)
        dz = self.speed * sin(self.pitch)
        
        self.plane.setPos(self.plane.getX() + dx, self.plane.getY() + dy, self.plane.getZ() + dz)
        self.plane.setHpr(self.yaw, self.pitch, self.roll)
        
        return Task.cont

# Start the game
app = FlightGame()
app.run()