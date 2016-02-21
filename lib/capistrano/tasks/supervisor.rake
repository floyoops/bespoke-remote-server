namespace :supervisor do

	desc 'service supervisord start'
	task :start do
	    on roles(:web) do
	    	within release_path do	    		
	    		execute :service, :supervisord, :start
	    	end
	    end
	end

	desc 'service supervisord stop'
	task :stop do
	    on roles(:web) do
	    	within release_path do	    		
	    		execute :service, :supervisord, :stop
	    	end
	    end
	end

	desc 'service supervisord restart'
	task :restart do
	    on roles(:web) do
	    	within release_path do	    		
	    		execute :service, :supervisord, :restart
	    	end
	    end
	end
end