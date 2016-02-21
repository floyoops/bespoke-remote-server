namespace :npm do
	desc 'npm install'
	task :install do
	    on roles(:web) do
	    	within release_path do
	    		execute :npm, :install	    		
	    	end
	    end
	end
end