const express = require('express');
const path = "/home/user/uploadfolder"
const app = require('express')();
const http = require('http').Server(app);
const fs = require('node:fs');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 12312;
//func to remove duplicates from array

app.use((req, res, next) => {
  console.log(req.method + " request @ " + req.originalUrl);
  next();
});

const times = x => f => {
  if (x > 0) {
    f()
    times (x - 1) (f)
  }
}

function uniq(a) {
  var seen = {};
  return a.filter(function(item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
}

app.use(cookieParser());
app.use(express.static(path))

app.get('/api/getFiles/*', (req, res) => {
  if (fs.existsSync(path+"/"+decodeURIComponent(req.originalUrl.split('/api/getFiles/')[1]))) {

    fullfolder = []
    const isFile = fileName => {
      return fs.lstatSync(fileName).isFile();
    };
    all = fs.readdirSync(path+"/"+decodeURIComponent(req.originalUrl.split('/api/getFiles/')[1]))
      .map(fileName => {
        return (path+"/"+decodeURIComponent(req.originalUrl.split('/api/getFiles/')[1]) +'/'+ fileName);
      })
    //console.log(all)
    files = fs.readdirSync(path+"/"+decodeURIComponent(req.originalUrl.split('/api/getFiles/')[1]))
      .map(fileName => {
        return (path+"/"+decodeURIComponent(req.originalUrl.split('/api/getFiles/')[1]) +'/'+ fileName);
      })
      .filter(isFile);
    folders = all.concat(files);
    folders = uniq(folders)
    //console.log(folders)
    folders = all.filter( x => !new Set(files).has(x) );
    //console.log(folders)
    /*folder = all
    index = -1
    console.log(all)
    console.log(files)
    folder.forEach(allx => {
      index+=1
      files.forEach(filesx => {
        if (allx === filesx) {
            console.log(allx, filesx)
            x = folder.splice(index,1)
        }
      });
    });*/
    //console.log(all)
    //0 = FOLDER
    //1 = FILE
    folders.forEach(element => {
      fullfolder.push([element, 0])
    });
    files.forEach(element => {
      fullfolder.push([element, 1])
    });
    res.send(fullfolder)
    return true;
  }
  res.send('404 Not Found.')
})

app.get('/api/getFiles', (req, res) => {
  fullfolder = []
  const isFile = fileName => {
    return fs.lstatSync(fileName).isFile();
  };
  all = fs.readdirSync(path)
    .map(fileName => {
      return (path +'/'+ fileName);
    })
  //console.log(all)
  files = fs.readdirSync(path)
    .map(fileName => {
      return (path +'/'+ fileName);
    })
    .filter(isFile);
  folders = all.concat(files);
  folders = uniq(folders)
  //console.log(folders)
  folders = all.filter( x => !new Set(files).has(x) );
  //console.log(folders)
  /*folder = all
  index = -1
  console.log(all)
  console.log(files)
  folder.forEach(allx => {
    index+=1
    files.forEach(filesx => {
      if (allx === filesx) {
          console.log(allx, filesx)
          x = folder.splice(index,1)
      }
    });
  });*/
  //console.log(all)
  //0 = FOLDER
  //1 = FILE
  folders.forEach(element => {
    fullfolder.push([element, 0])
  });
  files.forEach(element => {
    fullfolder.push([element, 1])
  });
  res.send(fullfolder)
  return true;
})

app.get('/jquery.js', (req, res) => {
  res.sendFile(__dirname + '/jquery.js')
})

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html')
})

app.get('/', (req, res) => {
  if (req.cookies['password'] == undefined) {
    res.sendFile(__dirname + '/login.html');
    return false;
  }
  if (req.cookies['password'] !== 'password123') {
    res.sendFile(__dirname + '/login.html');
    return false;
  }
  res.sendFile(__dirname + '/index.html');
})

app.get('/*', (req, res) => {
  if (req.cookies['password'] == undefined) {
    res.sendFile(__dirname + '/login.html');
    return false;
  }
  if (req.cookies['password'] !== 'password123') {
    res.sendFile(__dirname + '/login.html');
    return false;
  }
  res.sendFile(__dirname + '/index.html');
})


http.listen(port, () => {
  console.log(`running on port ${port}`);
});
