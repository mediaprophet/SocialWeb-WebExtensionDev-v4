$(document).ready(function() {
    // Solid Pod URL
    let podUrl;
  
    // Handle Login
    function handleLogin() {
      solid.auth.popupLogin().then(function(session) {
        if (session) {
          podUrl = session.webId.replace(/#.*$/, '').replace('profile/card', '');
          fetchUserProfile();
        } else {
          throw new Error('User session not found.');
        }
      }).catch(function(error) {
        console.error(error);
      });
    }
  
    // Fetch User Profile Data
    function fetchUserProfile() {
      const profileUrl = podUrl + 'profile.ttl';
      solid.auth.fetch(profileUrl).then(function(response) {
        if (response.status === 200) {
          return response.text();
        } else {
          throw new Error('Failed to fetch user profile data.');
        }
      }).then(function(profileData) {
        // Parse and populate the form with fetched data
        parseAndPopulateForm(profileData);
      }).catch(function(error) {
        console.error(error);
      });
    }
  
    // Parse and Populate the Form with Profile Data
    function parseAndPopulateForm(profileData) {
      const store = new $rdf.graph();
      const profileUrl = podUrl + 'profile.ttl';
  
      // Parse the profile data
      $rdf.parse(profileData, store, profileUrl, 'text/turtle');
  
      // Get the relevant vocabularies
      const commonVocab = $rdf.Namespace('https://inrupt.com/ns/common#');
      const solidVocab = $rdf.Namespace('https://www.w3.org/ns/solid/terms#');
      const inruptCoreVocab = $rdf.Namespace('https://inrupt.com/ns/core#');
  
      // Get the form fields
      const nameField = store.any(null, commonVocab('name'), null, $rdf.sym(profileUrl));
      const bioField = store.any(null, commonVocab('bio'), null, $rdf.sym(profileUrl));
      const homepageField = store.any(null, commonVocab('homepage'), null, $rdf.sym(profileUrl));
      const imageField = store.any(null, inruptCoreVocab('avatar'), null, $rdf.sym(profileUrl));
  
      // Populate the form with the field values
      if (nameField) {
        $('input[name="name"]').val(nameField.value);
      }
      if (bioField) {
        $('textarea[name="bio"]').val(bioField.value);
      }
      if (homepageField) {
        $('input[name="homepage"]').val(homepageField.value);
      }
      if (imageField) {
        $('input[name="image"]').val(imageField.value);
        $('#profile-image').attr('src', imageField.value);
      }
    }
  
    // Save Profile Data to Solid Pod
    function saveProfileData(formData) {
      const store = new $rdf.graph();
      const profileUrl = podUrl + 'profile.ttl';
  
      // Get the relevant vocabularies
      const commonVocab = $rdf.Namespace('https://inrupt.com/ns/common#');
      const solidVocab = $rdf.Namespace('https://www.w3.org/ns/solid/terms#');
      const inruptCoreVocab = $rdf.Namespace('https://inrupt.com/ns/core#');
  
      // Create the RDF triples for the form data
      const profileGraph = new $rdf.graph();
      const profileSubject = $rdf.sym(profileUrl);
  
      // Add the triples for the form fields
      profileGraph.add(profileSubject, commonVocab('name'), $rdf.lit(formData.name));
      profileGraph.add(profileSubject, commonVocab('bio'), $rdf.lit(formData.bio));
      profileGraph.add(profileSubject, commonVocab('homepage'), $rdf.sym(formData.homepage));
      profileGraph.add(profileSubject, inruptCoreVocab('avatar'), $rdf.sym(formData.image));
  
      // Update the profile data on the Solid Pod
      solid.auth.fetch(profileUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'text/turtle'
        },
        body: new $rdf.Serializer(store).statementsToN3(profileGraph.statements)
      }).then(function(response) {
        if (response.ok) {
          console.log('Profile data saved successfully.');
        } else {
          throw new Error('Failed to save profile data.');
        }
      }).catch(function(error) {
        console.error(error);
      });
    }
  
    // Handle Form Submission
    $('#profile-form').submit(function(e) {
      e.preventDefault();
  
      // Get the form data
      const formData = {
        name: $('input[name="name"]').val(),
        bio: $('textarea[name="bio"]').val(),
        homepage: $('input[name="homepage"]').val(),
        image: $('input[name="image"]').val()
      };
  
      // Save the profile data to the Solid Pod
      saveProfileData(formData);
    });
  
    // Handle Login Button Click
    $('#login-button').click(function(e) {
      e.preventDefault();
      handleLogin();
    });
  });  