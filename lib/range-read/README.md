# range-read

The idea here is to create a method that is a kind of range read where I can use an alpha value to read just part of a file. This is then somehting that I could use by way of say a promise that I return in an update method of a video where I could give the path to a very large file, and then just read the data that I want for a given frame.