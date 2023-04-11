import { useState, useEffect } from "react";
import styles from "./admin.module.css";
import Icon from "../Icon/Icon";

const Admin = () => {

  // Data for each entity
  const [entities, setEntities] = useState ([
    {
      name: "Users",
      fields: [
        "username",
        "name",
        "mail",
        "phonenumer",
        "adress",
        "birth_date",
        "role",
        "profile_picture"
      ],
      data: [
        {
          id : 1,
          username: "user1",
          name: "John Smith",
          mail: "john@example.com",
          phonenumer: "1234567890",
          adress: "123 Main St, Anytown USA",
          birth_date: "01/01/1980",
          role: "admin",
          profile_picture: "https://via.placeholder.com/150"
        },
        {
          id : 2,
          username: "user2",
          name: "John Smith",
          mail: "john@example.codsm",
          phonenumer: "123456789dkls0",
          adress: "123 Madqmslkfin St, Anytown USA",
          birth_date: "01/01/1980",
          role: "admindsf",
          profile_picture: "https://via.placeholder.cqsdfklom/150"
        },
        {
          id : 3,
          username: "user3",
          name: "JJ",
          mail: "john@emple.com",
          phonenumer: "1267890",
          adress: "123 MMMMMMain ytown USA",
          birth_date: "01/01/1980",
          role: "adms",
          profile_picture: "https://viaaaaa.pmqsdfjlklaceholder.com/150"
        },
        {
          id : 3,
          username: "user3",
          name: "John Sqmlskdfjmith",
          mail: "john@emple.com",
          phonenumer: "1267890",
          adress: "123 Main ytown USA",
          birth_date: "01/01/1980",
          role: "adminnnnnn",
          profile_picture: "https://viaaaaa.pmqsdfjlklaceholder.com/150"
        },
        // Add more user data here
      ]
    },
    {
      name: "Group",
      fields: ["name", "is_private", "image", "description"],
      data: [
        {
          id : 1,
          name: "Group 1",
          is_private: true,
          image: "https://via.placeholder.com/150",
          description: "This is a private group."
        },
        // Add more group data here
      ]
    },
    {
      name: "Post",
      fields: [
        "user",
        "content",
        "title",
        "image",
        "display",
        "end_date",
        "publication_date",
        "view_count"
      ],
      data: [
        {
          user: "user1",
          content: "Lorem ipsum dolor sit amet.",
          title: "Post Title",
          image: "https://via.placeholder.com/150",
          display: true,
          end_date: "01/01/2024",
          publication_date: "01/01/2022",
          view_count: 100
        },
        // Add more post data here
      ]
    },
    {
      name: "Banned",
      fields: ["user_which_bans", "user_who_is_banned", "reason", "date", "duration"],
      data: [
        {
          user_which_bans: "user1",
          user_who_is_banned: "user2",
          reason: "Inappropriate behavior",
          date: "01/01/2023",
          duration: "30 days"
        },
        // Add more banned data here
      ]
    },
    {
      name: "Message_team",
      fields: ["title"],
      data: [
        {
          title: "New feature request"
        },
        // Add more message team data here
      ]
    },
  ]);

  // Initial state for active tab
  const [enableChangeOnRow, setEnableChangeOnRow] = useState(false);
  const [activeTab, setActiveTab] = useState("Users");
  const [idRow, setIdRow] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);

  const handleRowChange = (event, field) => {
    const value = event.target.value;
    setCurrentRow({ ...currentRow, [field]: value });
  }

  const handleEnableChangeOnRow = (event, idRow) => {
    setEnableChangeOnRow(!enableChangeOnRow);
    setIdRow(idRow);
    const tab = entities.find(entity => entity.name === activeTab);
    const row = tab.data.find(entity => entity.id === idRow);
    setCurrentRow({ ...row});
  }

  const handleSaveChange = (event) => {
    setEnableChangeOnRow(!enableChangeOnRow);
    const newEntities = [...entities];
    const index = newEntities.findIndex((entity) => entity.name === activeTab);
    if (index !== -1) {
      const row = newEntities[index].data.find((data) => data.id === idRow);
      if (row) {
        const rowIndex = newEntities[index].data.indexOf(row);
        newEntities[index].data.splice(rowIndex, 1, currentRow);
        setEntities(newEntities);
      }
    }
  }

  const handleTab = (name) => {
    setActiveTab(name);
    if (enableChangeOnRow){
      setEnableChangeOnRow(!enableChangeOnRow);
      setCurrentRow(null);
    }
  }

  const handleCancelChange = (event) => {
    setEnableChangeOnRow(!enableChangeOnRow);
    setCurrentRow(null);
  }

  const activeData = entities.find(entity => entity.name === activeTab).data;

  return (
    <div className={styles.admin}>
      <h1>Admin Dashboard</h1>
      <div className={styles.tabs}>
        {entities.map(entity => (
          <div
            key={entity.name}
            className={`${styles.tab} ${activeTab === entity.name ? styles.active : ""}`}
            onClick={() => handleTab(entity.name)}
          >
            {entity.name}
          </div>
        ))}
      </div>
      <div className={styles.content}>
        <h>
            {activeTab}
        </h>
        <table id="my-table" className={styles.table}>
          <thead>
            <tr>
              {entities.find(entity => entity.name === activeTab).fields.map(field => (
                <th key={field}>{field} </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeData.map((item, index) => (
              <tr>
                {entities.find(entity => entity.name === activeTab).fields.map(field => (
                  <td style={{minWidth:item[field].length +'ch'}}> 
                    {(enableChangeOnRow && item["id"] === idRow) && (  
                      <input 
                        type="text"
                        value={currentRow[field]} 
                        onChange={(event) => handleRowChange(event,field)}
                      />
                    )}
                    {(!enableChangeOnRow || item["id"] !== idRow) && (
                      <input 
                        type="text" 
                        key={field}
                        value={item[field]} 
                        readOnly="hidden" 
                      />
                    )}
                  </td>
                ))}
                {(!enableChangeOnRow || item["id"] !== idRow) && (  
                  <td id="make-change" className={styles.icon} >
                    <Icon icon="fi fi-rr-pencil" handleClick={(event) => handleEnableChangeOnRow(event, item["id"])}/>
                  </td>
                )}
                {(enableChangeOnRow && item["id"] === idRow) &&  (  
                  <td className={styles.icons} >
                    <Icon icon="fi fi-sr-cross-small" handleClick={handleCancelChange}/>
                    <Icon icon="fi fi-sr-check" handleClick={handleSaveChange}/>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
  
export default Admin;