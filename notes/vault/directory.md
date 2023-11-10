# Directory Notes

## Directory Purpose

The Directory provides a means to manage agent relationships.  It is a core part of the 'vault'.

The directory includes support for managing a persons 'address book', as well as relationships with other things. it is loosely modelled on Active Directory

## About Active Directory
Active Directory (AD) is a directory service developed by Microsoft for Windows domain networks. It is included in most Windows Server operating systems as a set of processes and services. The primary function of Active Directory is to enable administrators to manage permissions and access to network resources. Active Directory stores information about objects on the network and makes this information easy for administrators and users to find and use. Here's a list of things that can typically be stored in Active Directory:

1. **User accounts**: Information about users, such as username, password, contact information, and login scripts.

2. **Computer accounts**: Records for each computer or network device, including attributes like computer name and network address.

3. **Security Groups**: Groupings of users, computers, and other groups to manage rights and permissions collectively.

4. **Organizational Units (OUs)**: Containers used to organize users, groups, computers, and other organizational units into a hierarchical structure.

5. **Group Policy Objects (GPOs)**: Policies applied to users and computers for managing registry-based policies, software deployment, script deployment, and folder redirection.

6. **Contacts**: Information about people or organizations that can be used for directory lookups, similar to an address book.

7. **Shared resources**: Information on shared folders, printers, and other resources that are available on the network.

8. **Distribution Lists**: Groups for email distribution that are not security-enabled.

9. **Service Connection Points (SCPs)**: Objects that allow services to publish their network addresses and serve clients looking for the service.

10. **Trust Relationships**: Information regarding the trust relationships between different domains in a forest or between forests.

11. **Schema Objects**: Definitions of object classes and attributes within the directory.

12. **DNS Information**: Active Directory-integrated DNS zones and records for domain name resolution within the network.

13. **Certificate Templates**: Definitions for types of certificates issued by a Certificate Authority associated with the directory.

14. **Ontologies** components: Certificates and certificate revocation lists (CRLs) used for secure communications.

15. **SID (Security Identifier) History**: Information used for maintaining relationships between previous and current SIDs when migrating accounts between domains.

16. **Exchange Attributes**: When integrated with Microsoft Exchange, stores information about mailbox-related attributes.

17. **Remote Access Service (RAS) and Network Policy Server (NPS) attributes**: Information for users and computers related to networking, like dial-in permissions and VPN configurations.

18. **Applications Specific Data**: Certain applications can extend the schema and store application-specific data within Active Directory for centralized management.

The actual data stored in Active Directory can be more extensive and detailed, depending on the needs of the organization and any customizations that have been made to the schema.

## About the webizen Directory
Webizen Directory (WD) is a directory structure developed to manage personal relationships. It is to be produced as a W3C Human Centric AI CG Recommendation, providing as a set of processes and syntax to support social web functionality.  The primary function of webizen Directory is to enable users to manage relationships, permissions and access to network resources. Webizen Directory stores information about agents that have been associated with the user at some-time and makes this information easy for users to manage. 

The Webizen Directory employs concepts relating to social-graph, bookmarks, addressbooks and phone directories to provide a means to manage social-web functionality. 

Here's a list of functionality that will be sought to be developed into the Webizen Directory:

1. **User accounts**: Information about users, such as username, password, contact information, and login scripts.

2. **Computer accounts**: Records for each computer or network device, including attributes like computer name and network address.

3. **Security Groups**: Groupings of users, computers, and other groups to manage rights and permissions collectively.

4. **Organizational Units (OUs)**: Containers used to organize users, groups, computers, and other organizational units into a hierarchical structure.

5. **Group Policy Objects (GPOs)**: Policies applied to users and computers for managing registry-based policies, software deployment, script deployment, and folder redirection.

6. **Contacts**: Information about people or organizations that can be used for directory lookups, similar to an address book.

7. **Shared resources**: Information on shared folders, printers, and other resources that are available on the network.

8. **Distribution Lists**: Groups for email distribution that are not security-enabled.

9. **Service Connection Points (SCPs)**: Objects that allow services to publish their network addresses and serve clients looking for the service.

10. **Trust Relationships**: Information regarding the trust relationships between different domains in a forest or between forests.

11. **Schema Objects**: Definitions of object classes and attributes within the directory.

12. **DNS Information**: Active Directory-integrated DNS zones and records for domain name resolution within the network.

13. **Certificate Templates**: Definitions for types of certificates issued by a Certificate Authority associated with the directory.

14. **Public Key Infrastructure (PKI)** components: Certificates and certificate revocation lists (CRLs) used for secure communications.

15. **SID (Security Identifier) History**: Information used for maintaining relationships between previous and current SIDs when migrating accounts between domains.

16. **Exchange Attributes**: When integrated with Microsoft Exchange, stores information about mailbox-related attributes.

17. **Remote Access Service (RAS) and Network Policy Server (NPS) attributes**: Information for users and computers related to networking, like dial-in permissions and VPN configurations.

18. **Applications Specific Data**: Certain applications can extend the schema and store application-specific data within Active Directory for centralized management.