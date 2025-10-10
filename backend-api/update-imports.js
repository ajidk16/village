#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Patterns to replace
const replacements = [
  {
    from: /from "\.\.\/\.\.\/db\//g,
    to: 'from "@/db/'
  },
  {
    from: /from "\.\.\/\.\.\/utils\//g,
    to: 'from "@/utils/'
  },
  {
    from: /from "\.\.\/\.\.\/plugins\//g,
    to: 'from "@/plugins/'
  },
  {
    from: /from "\.\.\/\.\.\/modules\//g,
    to: 'from "@/modules/'
  }
];

function updateFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    replacements.forEach(({ from, to }) => {
      const newContent = content.replace(from, to);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
  }
}

function walkDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDirectory(filePath);
    } else if (file.endsWith('.ts')) {
      updateFile(filePath);
    }
  });
}

// Start from src directory
const srcDir = path.join(__dirname, 'src');
walkDirectory(srcDir);

console.log('Import update completed!');