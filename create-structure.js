// const fs = require('fs');
// const path = require('path');

// const structure = {
//   'src': {
//     'assets': {},
//     'components': {
//       'Auth': {
//         'LoginForm.js': '',
//         'SignUpForm.js': '',
//       },
//       'Books': {
//         'BookList.js': '',
//         'BookCard.js': '',
//         'BookForm.js': '',
//       },
//       'Common': {
//         'Navbar.js': '',
//         'Footer.js': '',
//         'LoadingSpinner.js': '',
//       },
//       'Comments': {
//         'CommentList.js': '',
//         'CommentForm.js': '',
//       }
//     },
//     'contexts': {
//       'AuthContext.js': '',
//     },
//     'hooks': {
//       'useAuth.js': '',
//     },
//     'pages': {
//       'HomePage.js': '',
//       'LoginPage.js': '',
//       'SignUpPage.js': '',
//       'BookDetailPage.js': '',
//       'Admin': {
//         'AdminDashboardPage.js': '',
//         'ManageBooksPage.js': '',
//       },
//       'NotFoundPage.js': '',
//     },
//     'services': {
//       'authService.js': '',
//       'bookService.js': '',
//       'commentService.js': '',
//     },
//     'styles': {
//       // index.css zaten varsa tekrar yazılmaz
//     },
//     'firebase.js': '',
//   }
// };

// function createStructure(basePath, obj) {
//   for (const name in obj) {
//     const fullPath = path.join(basePath, name);

//     if (typeof obj[name] === 'string') {
//       // Dosya varsa atla
//       if (!fs.existsSync(fullPath)) {
//         fs.writeFileSync(fullPath, obj[name]);
//         console.log('Created file:', fullPath);
//       } else {
//         console.log('Skipped existing file:', fullPath);
//       }
//     } else {
//       // Klasör yoksa oluştur
//       if (!fs.existsSync(fullPath)) {
//         fs.mkdirSync(fullPath);
//         console.log('Created directory:', fullPath);
//       }
//       createStructure(fullPath, obj[name]);
//     }
//   }
// }

// // Proje kökünden başlat
// createStructure('.', structure);
const fs = require('fs');
const path = require('path');

const structure = {
  'src': {
    'assets': {},
    'components': {
      'Auth': {
        'LoginForm.js': '',
        'SignUpForm.js': '',
      },
      'Books': {
        'BookList.js': '',
        'BookCard.js': '',
        'BookForm.js': '',
      },
      'Common': {
        'Navbar.js': '',
        'Footer.js': '',
        'LoadingSpinner.js': '',
      },
      'Comments': {
        'CommentList.js': '',
        'CommentForm.js': '',
      }
    },
    'contexts': {
      'AuthContext.js': '',
    },
    'hooks': {
      'useAuth.js': '',
    },
    'pages': {
      'HomePage.js': '',
      'LoginPage.js': '',
      'SignUpPage.js': '',
      'BookDetailPage.js': '',
      'Admin': {
        'AdminDashboardPage.js': '',
        'ManageBooksPage.js': '',
      },
      'NotFoundPage.js': '',
    },
    'services': {
      'authService.js': '',
      'bookService.js': '',
      'commentService.js': '',
    },
    'styles': {
      'index.css': '',
    },
    'firebase.js': '',
  }
};

function createStructure(basePath, obj) {
  for (const name in obj) {
    const fullPath = path.join(basePath, name);

    if (typeof obj[name] === 'string') {
      // Dosya varsa atla
      if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, obj[name]);
        console.log('Oluşturuldu:', fullPath);
      } else {
        console.log('Mevcut dosya atlandı:', fullPath);
      }
    } else {
      // Klasör yoksa oluştur
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath);
        console.log('Oluşturuldu:', fullPath);
      }
      createStructure(fullPath, obj[name]);
    }
  }
}

// Proje kökünden başlat
createStructure('.', structure);

