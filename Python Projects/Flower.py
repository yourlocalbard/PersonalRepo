from turtle import * #importing functions from Turtle library
from colorsys import * 

hue = 0.8 #shading details
bgcolor = ("pink") #background color
speed(500) #drawing speed

for i in range(264): #for loop to continually iterate
    col = hsv_to_rgb(hue, 1, 1)
    hue += 0.005
    color(col, col)
    begin_fill()
    circle(270 - i, 90)
    lt(90)
    circle(270 - i, 90)
    lt(10)
    end_fill()

done()