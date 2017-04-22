import React from 'react';
import { List, ListItem } from 'material-ui/List';
import FileFileUpload from 'material-ui/svg-icons/file/file-upload';
import AlertErrorOutline from 'material-ui/svg-icons/alert/error-outline';

const UploadFiles = ({ validFiles, invalidFiles }) => (
  <div>
    <List> 
      {
        validFiles.map((file, index) => (
          <ListItem 
            key={index}
            primaryText={file.name}
            secondaryText={file.size}
            leftIcon={<FileFileUpload />} 
          />
        ))
      }
    </List>
    <List> 
      {
        invalidFiles.map((file, index) => (
          <ListItem 
            key={index}
            primaryText={file.name}
            secondaryText={file.size}
            leftIcon={<AlertErrorOutline />} 
          />
        ))
      }
    </List>
  </div>
);

export default UploadFiles;