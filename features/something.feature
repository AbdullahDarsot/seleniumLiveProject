Feature: Youtube

    Scenario: Initially has a search bar
        Given the home page
        Then the 'search input' element should be there
    
    # Scenario: Initially has a search submit button
    #     Given the weather page
    #     Then the 'search submit' element should be there
    
    # Scenario: Initially has no location heading
    #     Given the weather page
    #     Then the 'location heading' element should be missing
    
    # Scenario: Location heading exists after a search
    #     Given the weather page
    #     When the 'Bridgnorth' location is searched for
    #     Then the 'location heading' element should be there
    
    # Scenario: Location heading matches after a search
    #     Given the weather page
    #     When the 'Bridgnorth' location is searched for
    #     Then the 'location heading' element should be matching
